import { randomUUID } from 'crypto'
import { Organization } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { Decimal } from '@prisma/client/runtime/library'

export function makeOrganization(override: Partial<Organization> = {}) {
  const organization: Organization = {
    id: randomUUID(),
    author_name: faker.person.fullName(),
    cep: faker.location.zipCode(),
    city: faker.location.city(),
    email: faker.internet.email(),
    latitude: new Decimal(faker.location.latitude()),
    longitude: new Decimal(faker.location.longitude()),
    name: faker.company.name(),
    neighborhood: faker.location.streetAddress(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    state: faker.location.state(),
    street: faker.location.street(),
    ...override,
  }
  return organization
}
