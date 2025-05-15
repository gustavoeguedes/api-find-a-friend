import { Prisma, Pet } from '@prisma/client'
import { FetchByCityProps, PetsRepository } from '../pets-repository'
import { prisma } from '../../lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async fetchByCity({
    age,
    city,
    energy_level,
    environment,
    size,

    page = 1,
    pageSize = 10,
  }: FetchByCityProps): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        Organization: { city },
        size,
        age,
        environment,
        energy_level,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    })

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id } })

    if (!pet) return null

    return pet
  }
}
