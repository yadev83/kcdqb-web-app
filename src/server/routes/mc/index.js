import { Router } from 'express'
import { getServerStats } from './actions.js'

const mcRouter = Router()

mcRouter.get('/stats', getServerStats)

export default mcRouter
