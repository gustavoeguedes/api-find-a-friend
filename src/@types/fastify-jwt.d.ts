import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    organization: {
      sub: string
    }
  }
}
