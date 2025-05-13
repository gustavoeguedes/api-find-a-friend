import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '../../../use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    city: z.string(),
    state: z.string(),
    cep: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    phone: z.string(),
  })

  const {
    author_name,
    name,
    cep,
    city,
    email,
    latitude,
    longitude,
    neighborhood,
    password,
    phone,
    state,
    street,
  } = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterUseCase()
  await registerUseCase.execute({
    author_name,
    name,
    cep,
    city,
    email,
    latitude,
    longitude,
    neighborhood,
    password,
    phone,
    state,
    street,
  })

  reply.status(201)
}
