import fs from 'fs'
import { parse } from 'csv-parse'

export function readCSV(filePath, delimiter = ';', hasHeader = true) {
    return new Promise((resolve, reject) => {
        const output = []
        const keys = []

        const records = []
        const parser = parse({delimiter: delimiter, relax_quotes: true})
    
        const stream = fs.createReadStream(filePath)
    
        // Parse
        parser.on('data', (row) => {
            records.push(row)
        })
    
        // On end => resolve
        stream.on('end', () => {
            records.forEach((record, lineIndex) => {
                // If we use header lines, we name the output object's keys based on the first line of the file
                if(hasHeader) {
                    if(lineIndex === 0) {
                        keys.push(...record)
                    } else {
                        const row = {}
                        keys.forEach((key, index) => {
                            row[key] = record[index]
                        })

                        output.push(row)
                    }
                } else {
                    output.push(record)
                }
            })
            
            resolve(output)
        })
    
        // On error => reject
        stream.on('error', (err) => {
            console.error(`ERROR while csv read : ${err.toString()}`)
            reject(`ERROR while csv read : ${err.toString()}`)
        })
    
        // Start the reading
        stream.pipe(parser)
    })
}