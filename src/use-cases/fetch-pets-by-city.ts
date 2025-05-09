import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'

interface FetchPetsByCityUseCaseRequest {
  name: string
  age: number
  type: 'CAT' | 'DOG'
  city: string
  organizationId: string
}

interface FetchPetsByCityUseCaseResponse {
  pet: Pet
}

export class FetchPetsByCityUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    age,
    city,
    name,
    type,
    organizationId,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      age,
      type,
      city,
      organizationId,
    })

    return {
      pet,
    }
  }
}
