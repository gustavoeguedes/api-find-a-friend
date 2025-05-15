import { FastifyInstance } from 'fastify'
import { register } from './register'
import { refresh } from './refresh'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { authenticate } from './authenticate'
import { profile } from './organization'

export function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.post('/sessions', authenticate)

  app.patch('token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
