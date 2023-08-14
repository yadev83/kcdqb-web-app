import path from 'path'
import { readCSV, DATABASE_PATH } from "../../utils"

const MODS_DATABASE_PATH = path.resolve(DATABASE_PATH, 'mods.csv')


export const getAll = (req, res) => {
    return readCSV(MODS_DATABASE_PATH).then((result) => {
        return res.status(200).json(result)
    }).catch(err => {
        console.error(`ERROR while mods getAll : ${err.toString()}`)
        return res.status(500).json({message: `ERROR while mods getAll : ${err.toString()}`})
    })
}