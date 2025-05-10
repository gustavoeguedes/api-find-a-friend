import { Prisma, Pet } from '@prisma/client'
import { FetchByCityProps, PetsRepository } from '../pets-repository'
import { prisma } from '../../lib/prisma'

interface FilterWhereProps {
  age?: number
  cityId: string
  organizationId?: string
  type?: 'DOG' | 'CAT'
}

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })
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
    const filterWhere: FilterWhereProps = {
      cityId,
    }
    if (age) {
      filterWhere.age = age
    }

    if (organizationId) {
      filterWhere.organizationId = organizationId
    }
    if (type) {
      filterWhere.type = type
    }
    const pets = await prisma.pet.findMany({
      where: filterWhere,
      take: pageSize,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id: petId } })

    if (!pet) return null

    return pet
  }
}
