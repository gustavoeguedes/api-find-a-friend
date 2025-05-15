import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetOrganizationUseCase } from '../../../use-cases/factories/make-get-organization-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetOrganizationUseCase()

  const { organization } = await getUserProfile.execute({
    organizationId: request.organization.sub,
  })

  reply.status(200).send({
    organization: {
      ...organization,
      password_hash: undefined,
    },
  })
}
