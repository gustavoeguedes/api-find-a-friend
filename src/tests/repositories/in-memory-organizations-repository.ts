import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../../repositories/organizations-repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []
  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization: Organization = {
      id: randomUUID(),
      name: data.name,
      author_name: data.author_name,
      email: data.email,
      city: data.city,
      state: data.state,
      cep: data.cep,
      street: data.street,
      latitude: new Decimal(Number(data.latitude)),
      longitude: new Decimal(Number(data.longitude)),
      password: data.password,
      neighborhood: data.neighborhood,
      phone: data.phone,
    }
    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }
}
