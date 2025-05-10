import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { FindPetByIdUseCase } from '../find-pet-by-id'

export function makeFindPetById() {
  const petsRepository = new PrismaPetsRepository()
  const findPetByIdUseCase = new FindPetByIdUseCase(petsRepository)
  return findPetByIdUseCase
}
