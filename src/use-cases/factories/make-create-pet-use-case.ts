import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()
  const createPetUseCase = new CreatePetUseCase(
    petsRepository,
    organizationsRepository,
  )

  return createPetUseCase
}
