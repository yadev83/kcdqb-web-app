import path from 'path'

export const MCSERVER_HOSTNAME  = 'kcdqb.fr'
export const MCSERVER_PORT      = 25565

export const MCSERVER_QUERY_TYPE_HANDSHAKE  = 0x09
export const MCSERVER_QUERY_TYPE_STAT       = 0x00

export const DATABASE_PATH      = path.resolve(process.cwd(), 'database')