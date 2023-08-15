import { Router } from 'express'
import { getAll } from './actions.js'

const modsRouter = Router()

modsRouter.get('/', getAll)

export default modsRouter
