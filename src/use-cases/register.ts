import { hash } from 'bcryptjs'
import { OrganizationsRepository } from '../repositories/organizations-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Organization } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  author_name: string
  email: string
  password: string
  city: string
  state: string
  cep: string
  street: string
  neighborhood: string
  latitude: number
  longitude: number
  phone: string
}

interface RegisterUseCaseResponse {
  organization: Organization
}
export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    author_name,
    cep,
    street,
    city,
    latitude,
    longitude,
    neighborhood,
    phone,
    state,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password: passwordHash,
      author_name,
      city,
      state,
      cep,
      latitude,
      longitude,
      neighborhood,
      phone,
      street,
    })

    return { organization }
  }
}
