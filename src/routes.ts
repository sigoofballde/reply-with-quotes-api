import { Router } from 'express'
import * as main from './controllers/index.controller'

export const routes = Router()

routes.get('/', main.home)
routes.post('/getConversation', main.getConversation)
