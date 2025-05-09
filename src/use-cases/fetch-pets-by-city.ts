import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'

interface FetchPetsByCityUseCaseRequest {
  cityId: string
  type?: 'DOG' | 'CAT'
  age?: number
  organizationId?: string
  page?: number
  pageSize?: number
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    cityId,
    type,
    age,
    organizationId,
    page = 1,
    pageSize = 10,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.fetchByCity({
      cityId,
      type,
      age,
      organizationId,
      page,
      pageSize,
    })

    return {
      pets,
    }
  }
}
