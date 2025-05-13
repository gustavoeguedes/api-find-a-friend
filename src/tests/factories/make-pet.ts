import { randomUUID } from 'crypto'
import { Pet } from '@prisma/client'
import { faker } from '@faker-js/faker'

export function makePet(override: Partial<Pet> = {}) {
  const pet: Pet = {
    id: randomUUID(),
    about: faker.lorem.paragraph(1),
    age: faker.number.int({ min: 1, max: 15 }).toString(),
    name: faker.person.firstName(),
    size: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
    energy_level: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
    environment: faker.helpers.arrayElement(['INDOORS', 'OUTDOORS']),
    organization_id: faker.string.uuid(),

    ...override,
  }
  return pet
}
