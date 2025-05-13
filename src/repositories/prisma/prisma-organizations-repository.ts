import { Prisma, Organization } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { prisma } from '../../lib/prisma'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    if (!organization) {
      return null
    }
    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    if (!organization) {
      return null
    }

    return organization
  }

  async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const organization = await prisma.organization.create({
      data,
    })
    return organization
  }
}
