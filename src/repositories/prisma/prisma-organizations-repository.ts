import { Prisma, Organization } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { prisma } from '../../lib/prisma'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const organization = await prisma.organization.create({
      data,
    })
    return organization
  }
}
