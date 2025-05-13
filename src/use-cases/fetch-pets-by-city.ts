import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'

interface FetchPetsByCityUseCaseRequest {
  city: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
  page?: number
  pageSize?: number
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    environment,
    page = 1,
    pageSize = 10,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.fetchByCity({
      city,
      age,
      size,
      energy_level,
      environment,
      page,
      pageSize,
    })

    return {
      pets,
    }
  }
}
