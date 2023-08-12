import { Router } from 'express'
import { getServerStats, getPlayersSkin } from './actions.js'

const mcRouter = Router()

mcRouter.get('/stats', getServerStats)
mcRouter.get('/players-skin', getPlayersSkin)

export default mcRouter
