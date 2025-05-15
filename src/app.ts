import fastify from 'fastify'
import { ZodError } from 'zod'
import { organizationRoutes } from './http/controllers/organizations/route'
import { petsRoutes } from './http/controllers/pets/route'
import fastifyJwt from 'fastify-jwt'
import { env } from './env'
import fastifyCookie from 'fastify-cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(organizationRoutes)
app.register(petsRoutes)

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
