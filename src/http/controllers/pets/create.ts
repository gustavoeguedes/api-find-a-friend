import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '../../../use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    environment: z.string(),
    organization_id: z.string(),
  })

  const { name, about, age, size, energy_level, environment, organization_id } =
    createBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    about,
    age,
    energy_level,
    environment,
    name,
    organization_id,
    size,
  })

  return reply.status(201).send()
}
