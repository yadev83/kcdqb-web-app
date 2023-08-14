import fs from 'fs'
import { parse } from 'csv-parse'

export function read(filePath, delimiter = ';', hasHeader = true) {
    return new Promise((resolve, reject) => {
        const output = {}

        const records = []
        const parser = parse({delimiter: delimiter})
    
        const stream = fs.createReadStream(filePath)
    
        // Parse
        stream.on('data', (row) => {
            records.push(row)
        })
    
        // On end => resolve
        stream.on('end', () => {
            resolve(output)
        })
    
        // On error => reject
        stream.on('error', (err) => {
            console.error(`ERROR while csv read : ${err.toString()}`)
            reject(`ERROR while csv read : ${err.toString()}`)
        })
    
        // Start the reading
        fs.createReadStream(filePath).pipe(parser)
    })
}