import { Router } from 'express'
import { greeting } from './actions.js'

const testRouter = Router()

testRouter.get('/', greeting)

export default testRouter
