import { FastifyInstance } from 'fastify'
import { register } from './register'

export function organizationRoutes(app: FastifyInstance) {
  app.post('/register', register)
}
