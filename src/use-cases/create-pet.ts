import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'

interface CreatePetUseCaseRequest {
  name: string
  age: number
  type: 'CAT' | 'DOG'
  cityId: string
  organizationId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    age,
    cityId,
    name,
    type,
    organizationId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      age,
      type,
      cityId,
      organizationId,
    })

    return {
      pet,
    }
  }
}
