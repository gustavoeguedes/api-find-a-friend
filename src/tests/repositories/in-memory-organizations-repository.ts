import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../../repositories/organizations-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []
  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = {
      id: randomUUID(),
      name: data.name,
      address: data.address,
      phone: data.phone,
    }
    this.items.push(organization)

    return organization
  }
}
