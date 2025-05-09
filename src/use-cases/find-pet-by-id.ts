import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FindPetByIdUseCaseRequest {
  petId: string
}

interface FindPetByIdUseCaseResponse {
  pet: Pet
}

export class FindPetByIdUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: FindPetByIdUseCaseRequest): Promise<FindPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
