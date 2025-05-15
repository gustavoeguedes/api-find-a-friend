import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'
import { GetOrganizationProfileUseCase } from '../get-organization-profile'

export function makeGetOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository()
  const getOrganizationUseCase = new GetOrganizationProfileUseCase(
    organizationRepository,
  )
  return getOrganizationUseCase
}
