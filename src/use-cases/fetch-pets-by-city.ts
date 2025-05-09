import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'

interface FetchPetsByCityUseCaseRequest {
  cityId: string
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    cityId,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.fetchByCity(cityId)

    return {
      pets,
    }
  }
}
