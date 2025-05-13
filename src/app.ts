import fastify from 'fastify'
import { env } from 'process'
import { ZodError } from 'zod'
import { organizationRoutes } from './http/controllers/organizations/route'

export const app = fastify()

app.register(organizationRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we shold log an external tool like
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
