import { compare } from 'bcryptjs'
import { OrganizationsRepository } from '../repositories/organizations-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { Organization } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  organization: Organization
}

export class AuthenticateUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doesPassowordMatches = await compare(password, organization.password)
    if (!doesPassowordMatches) {
      throw new InvalidCredentialsError()
    }

    return { organization }
  }
}
