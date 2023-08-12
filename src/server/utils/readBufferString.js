export function readBufferString(buffer, offset = 0) {
    let offsetCursor = offset

    let outputString = ''
    let currentChar = buffer.readUInt8(offsetCursor)

    while(currentChar != 0) {
        outputString = outputString.concat(currentChar.toString(16))
        offsetCursor++
        currentChar = buffer.readUInt8(offsetCursor)
    }

    return outputString
}