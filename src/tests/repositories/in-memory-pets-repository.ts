import { Pet, Prisma } from '@prisma/client'
import {
  FetchByCityProps,
  PetsRepository,
} from '../../repositories/pets-repository'
import { randomUUID } from 'crypto'
import { InMemoryOrganizationsRepository } from './in-memory-organizations-repository'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private orgsRepository: InMemoryOrganizationsRepository) {}
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      about: data.about,
      size: data.size,
      energy_level: data.energy_level,
      environment: data.environment,
      organization_id: data.organization_id,
    }

    this.items.push(pet)

    return pet
  }

  async fetchByCity({
    city,
    age,
    size,
    energy_level,
    environment,
    page = 1,
    pageSize = 10,
  }: FetchByCityProps): Promise<Pet[]> {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === city,
    )
    const pets = this.items
      .filter((item) =>
        orgsByCity.some((org) => org.id === item.organization_id),
      )
      .filter((item) => (age ? item.age === age : true))
      .filter((item) => (size ? item.size === size : true))
      .filter((item) =>
        energy_level ? item.energy_level === energy_level : true,
      )
      .filter((item) => (environment ? item.environment === environment : true))
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
