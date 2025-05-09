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
    let pets: Pet[]
    pets = this.items.filter((pet) => pet.cityId === cityId)
    if (age) {
      pets = pets.filter((pet) => pet.age === age)
    }
    if (organizationId) {
      pets = pets.filter((pet) => pet.organizationId === organizationId)
    }
    if (type) {
      pets = pets.filter((pet) => pet.type === type)
    }

    pets = pets.slice((page - 1) * pageSize, page * pageSize)

    return pets
  }
}
