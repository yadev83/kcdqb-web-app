import { Router } from 'express'
import * as routes from './routes'

const router = Router()

const bootstrap = () => {
    router.use('/api/test', routes.Test)
    
    return router 
}

export default bootstrap