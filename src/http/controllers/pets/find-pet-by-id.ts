import { z } from 'zod'
import { makeFindPetByIduseCase } from '../../../use-cases/factories/make-find-pet-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findPetById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findPetByIdSchema = z.object({
    id: z.string().uuid(),
  })
  const { id } = findPetByIdSchema.parse(request.params)
  const findPetByIdUseCase = makeFindPetByIduseCase()

  const pet = await findPetByIdUseCase.execute({ id })

  reply.status(200).send({
    pet,
  })
}
