import { Pet, Prisma } from '@prisma/client'

export interface FetchByCityProps {
  cityId: string
  age?: number
  type?: 'DOG' | 'CAT'
  organizationId?: string
  page?: number
  pageSize?: number
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  fetchByCity({
    cityId,
    age,
    organizationId,
    page,
    pageSize,
    type,
  }: FetchByCityProps): Promise<Pet[]>
  findById(petId: string): Promise<Pet | null>
}
