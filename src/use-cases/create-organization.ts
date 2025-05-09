import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '../repositories/organizations-repository'

interface CreateOrganizationUseCaseRequest {
  name: string
  address: string
  phone: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationsRepository,
  ) {}

  async execute({
    name,
    address,
    phone,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const organization = await this.organizationRepository.create({
      name,
      address,
      phone,
    })

    return {
      organization,
    }
  }
}
