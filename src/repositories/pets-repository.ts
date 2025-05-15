import { Pet, Prisma } from '@prisma/client'

export interface FetchByCityProps {
  city: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
  page?: number
  pageSize?: number
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  fetchByCity({
    city,
    age,
    size,
    energy_level,
    environment,
    pageSize,
  }: FetchByCityProps): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
