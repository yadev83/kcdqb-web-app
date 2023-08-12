import udp from 'dgram'
import { Buffer } from 'buffer'
import { 
    MCSERVER_HOSTNAME, 
    MCSERVER_PORT, 
    MCSERVER_QUERY_TYPE_HANDSHAKE, 
    MCSERVER_QUERY_TYPE_STAT,
    readBufferString,
    hexToAscii,
    swapEndianMode,
    request
} from '../../utils'

/**
 * Gets the server stats from a minecraft server
 * (hostname and port are hardcoded in constants utils)
 * 
 * doc : https://wiki.vg/Query
 * 
 * typical expected packet from client : {Magic (short), Type (byte), Session Id (Int32), payload (empty or int32 token)}
 * typical expected response from server : {Type (byte), SessionId(int32), payload}
 * @param {*} req 
 * @param {*} res 
 */
export const getServerStats = (req, res) => {
    const magicHeader = Buffer.from([0xFE, 0xFD])       // magic value as stated per the docs of minecraft server
    const sessionId = Buffer.alloc(4)                   // Random id betwen 0 and 2^32-1 (4 bytes)
    const sessionIdMask = 0x0f0f0f0f                    // MC only processes the lower 4 bits of the byte for some reasons, set the rest to 0
    sessionId.writeUInt32BE(sessionIdMask & parseInt(Math.random() * (Math.pow(2, 32) - 1))) // Write Int32 while applying the mask
    const padding = Buffer.alloc(4, 0)                  // Zero padding used when we want full stats instead of basic

    // Prepare the udp client to ask the server stats
    const client = udp.createSocket('udp4')
    let timeout = null

    // The client message callback
    client.on('message', (response, info) => {        
        handleResponse(response, info)
    })

    const sendPacket = (packet) => {
        timeout = setTimeout(() => {
            res.status(500).json({code: 408, message: 'Request Timeout: MC Server did not respond in time'})
        }, 5000)

        client.send(packet, MCSERVER_PORT, MCSERVER_HOSTNAME, (err) => {
            if(err) {
                console.error(`ERROR while sendPacket (getServerStats) ${packet} : ${err.toString()}`)
                throw new Error(`ERROR while sendPacket (getServerStats) ${packet} : ${err.toString()}`)
            }
        })
    }

    const handleResponse = (response, info) => {
        // console.log('### Server Info', info)
        // console.log('### Received Message', response)
        clearTimeout(timeout)
        
        const parsedResponse = parseResponse(response)

        switch(parsedResponse.type) {
            case MCSERVER_QUERY_TYPE_HANDSHAKE: {
                const statPacket = Buffer.concat([magicHeader, Buffer.from([MCSERVER_QUERY_TYPE_STAT]), sessionId, parsedResponse.payload, padding])
                sendPacket(statPacket)
            } break

            default: {
                client.close()
                
                const publicPayload = {
                    ...parsedResponse.payload,
                    hostip: info.address
                }

                res.status(200).json({payload: publicPayload})
            }
        }
    }

    const handShake = Buffer.concat([magicHeader, Buffer.from([MCSERVER_QUERY_TYPE_HANDSHAKE]), sessionId])
    sendPacket(handShake)
}

export const getPlayersSkin = async (req, res) => {
    let players = req.query['players'].split(",");
    console.log("players = ", players)
    const UUIDs = new Map()
    
    const getSkins = async () => {
        // We will fill up this map with <username, skinUrl> entries
        const skinsUrl = new Map()
        // First we need to get uuid for each received username 
        await request.post("https://api.mojang.com/profiles/minecraft", players, null).then(async profiles => {
            // Storing each corresponding uuid in a map of <username, uuid> 
            profiles.data.forEach(user => UUIDs.set(user.name, user.id))

            // Iterating on our map
            for(let [username, uuid] of UUIDs) {
                // Then we need to ask for profile using UUID to construct request
                await request.get("https://sessionserver.mojang.com/session/minecraft/profile/" + uuid).then(response => {
                    // Interesting field is base64-encoded, we need to decode it
                    let buff = Buffer.from(response.data['properties'][0]['value'], 'base64')
                    const decodedBase64Json = JSON.parse(buff.toString('ascii'))
                    skinsUrl.set(username, decodedBase64Json['textures']['SKIN']['url'])
                })
            }
        })
        return skinsUrl
    }
    
    const skinsUrl = await getSkins();
    res.status(200).json({ payload: Object.fromEntries(skinsUrl)});

}

const parseResponse = (response) => {
    const payloadStartIndex = 5 // 1 byte for type, 4 bytes for sessionId, the rest is payload only

    const responseType = response.readUint8(0),
        responseSessId = response.readUInt32BE(1)

    let payload = null

    switch(responseType) {
        case MCSERVER_QUERY_TYPE_HANDSHAKE: {
            const tokenString = readBufferString(response, payloadStartIndex),
                parsedToken = parseInt(hexToAscii(tokenString))

            const challengeToken = Buffer.alloc(4, 0)
            challengeToken.writeUint32BE(parsedToken)

            payload = challengeToken
        } break

        case MCSERVER_QUERY_TYPE_STAT: {
            const responsePayload = readPayload(response)

            // Two cases : base stat and full stat
            // Base stat has 6 parts (7, but parsed as 6) outside of the typical header
            // Full stat has a different formatting.
            if(responsePayload?.length === 6) {
                // Simple stat
                payload = {}

                payload.motd = hexToAscii(responsePayload[0])
                payload.gametype = hexToAscii(responsePayload[1])
                payload.map = hexToAscii(responsePayload[2])
                payload.numplayers = hexToAscii(responsePayload[3])
                payload.maxplayers = hexToAscii(responsePayload[4])

                // The last part of the payload is a hex buffer holding : XX XX YY YY YY YY YY YY YY ...
                // Where XX XX define the host port (AS A LITTLE ENDIAN, HAVE TO REVERT BYTES BEFORE PARSEINT) (hex to decimal)
                // And the YY part define the host ip (hex to ascii)
                const hexPort = responsePayload[5].substr(0, 4)
                const hexHost = responsePayload[5].substr(4)
                payload.port = parseInt(swapEndianMode(hexPort), 16)
                payload.host = hexToAscii(hexHost)
            } else {
                // Full stat
                // Format of the payload is different.
                // First, theres a 11bytes padding to skip.
                // Then, theres a \0 separated Key=>Value section (0 length key is the end)
                // Then, another 10bytes padding to skip
                // Then, a list of connected players, \0 separated. (0 length player name is the end)
                payload = {}

                // Thus, instead of reading the payload as text, and working with strings, here we need to split the buffer
                // Server info is at offset HEADER + 11B, so we start here
                let offset = payloadStartIndex + 11

                let key = null, value = null
                while(true) {
                    key = readBufferString(response, offset)   

                    offset += 1 + (key?.length ? key?.length / 2 : 0) // We read bytes 2 by 2 when reading text, so string length /2 is bytes read + 1 for end of str
 
                    if(!key?.length)
                        break

                    value = readBufferString(response, offset)
                    offset += 1 + (value?.length ? value?.length / 2 : 0) // We read bytes 2 by 2 when reading text, so string length /2 is bytes read + 1 for end of str

                    payload[hexToAscii(key)] = hexToAscii(value)
                }

                // Add 10 bytes of separation before players list
                offset += 10

                // Now read player names until we get an empty one
                const playerNames = []
                let playerName = null
                while(true) {
                    playerName = readBufferString(response, offset)

                    offset += 1 + (playerName?.length ? playerName?.length / 2 : 0)

                    if(!playerName?.length)
                        break

                    playerNames.push(hexToAscii(playerName))
                }

                payload.players = playerNames
            }
        } break

        default:
            payload = readPayload(response)
            break
    }
    
    return {
        type: responseType,
        sessionID: responseSessId,
        payload
    }
}

function readPayload(response, startingOffset = 5) {
    const rawPayload = []
    let offsetCursor = startingOffset

    while(offsetCursor !== response?.length) {
        let rawPayloadPart = ''
        let bufferP = response.readUint8(offsetCursor)

        while(bufferP !== 0) {
            rawPayloadPart = rawPayloadPart.concat(bufferP.toString(16))
            offsetCursor++
            bufferP = response.readUint8(offsetCursor)
        }

        offsetCursor++
        rawPayload.push(rawPayloadPart)
    }

    return rawPayload
}