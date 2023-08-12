import path from 'path'
import fs from 'fs'

export const getDownloadablesList = (req, res) => {
    const downloadablesDir = path.join(process.cwd(), 'cdn')

    fs.promises.readdir(downloadablesDir).then(filenames => {
        return res.status(200).json(filenames)
    }).catch(err => {
        console.error(`ERROR while getDownloadablesList ${err.toString()}`)
        return res.status(500).json({error: `ERROR while getDownloadablesList ${err.toString()}`})
    })
}