import { Pet, Prisma } from '@prisma/client'
import {
  FetchByCityProps,
  PetsRepository,
} from '../../repositories/pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      type: data.type,
      cityId: data.cityId,
      organizationId: data.organizationId,
    }

    this.items.push(pet)

    return pet
  }

  async fetchByCity({
    cityId,
    age,
    organizationId,
    page = 1,
    pageSize = 10,
    type,
  }: FetchByCityProps): Promise<Pet[]> {
    const start = (page - 1) * pageSize
    const end = start + pageSize

    const pets = this.items
      .filter((pet) => pet.cityId === cityId)
      .filter((pet) => (age ? pet.age === age : true))
      .filter((pet) =>
        organizationId ? pet.organizationId === organizationId : true,
      )
      .filter((pet) => (type ? pet.type === type : true))
      .slice(start, end)

    return pets
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = this.items.find((pet) => pet.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }
}
