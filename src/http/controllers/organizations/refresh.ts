import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const token = await reply.jwtSign({
    sign: {
      sub: request.organization.sub,
    },
  })

  const refreshToken = await reply.jwtSign({
    sign: {
      sub: request.organization.sub,
      expiresIn: '7d',
    },
  })

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
