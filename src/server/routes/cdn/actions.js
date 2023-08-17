import path from 'path'
import fs from 'fs'

export const getDownloadablesList = (req, res) => {
    const downloadablesDir = path.join(process.cwd(), 'cdn')

    fs.promises.readdir(downloadablesDir).then(filenames => {
        return Promise.all(filenames.map(filename => {
            return fs.promises.stat(path.join(process.cwd(), 'cdn', filename)).then(stats => {
                return Promise.resolve({
                    name: filename,
                    type: stats.isDirectory() ? 'dir' : stats.isFile() ? 'file' : undefined,
                    size: stats.size,
                    created_at: stats.mtime,
                    updated_at: stats.ctime,
                    last_download: stats.atime
                })
            })
        }))
    }).then((files) => {
        return res.status(200).json(files.sort((fileA, fileB) => fileB.updated_at - fileA.updated_at))
    }).catch(err => {
        console.error(`ERROR while getDownloadablesList ${err.toString()}`)
        return res.status(500).json({error: `ERROR while getDownloadablesList ${err.toString()}`})
    })
}