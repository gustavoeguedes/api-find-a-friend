import { z } from 'zod'
import { makeFetchPetsByCityUseCase } from '../../../use-cases/factories/make-fetch-pets-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    city: z.string().min(1),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional(),
    page: z.number().optional().default(1),
    pageSize: z.number().optional().default(10),
  })

  const { city, age, size, energy_level, environment, page, pageSize } =
    querySchema.parse(request.query)

  const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase()

  const pets = await fetchPetsByCityUseCase.execute({
    city,
    age,
    size,
    energy_level,
    environment,
    page,
    pageSize,
  })

  return reply.status(200).send({
    pets,
  })
}
