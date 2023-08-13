import { Router } from 'express'
import { getDownloadablesList } from './actions.js'

const CDNRouter = Router()

CDNRouter.get('/list', getDownloadablesList)

export default CDNRouter
