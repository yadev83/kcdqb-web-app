import { Router } from 'express'
import * as routes from './routes'

const router = Router()

const bootstrap = () => {
    router.use('/api/mc', routes.McRouter)
    router.use('/api/cdn', routes.CDNRouter)
    router.use('/api/mods', routes.ModsRouter)

    return router 
}

export default bootstrap