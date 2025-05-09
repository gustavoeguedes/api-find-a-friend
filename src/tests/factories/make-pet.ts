import { randomUUID } from 'crypto'
import { Pet } from '@prisma/client'
import { faker } from '@faker-js/faker'

export function makePet(override: Partial<Pet> = {}) {
  const pet = {
    id: randomUUID(),
    name: faker.animal.dog(),
    age: faker.number.int({ min: 1, max: 15 }),
    type: faker.helpers.arrayElement(['DOG', 'CAT']),
    cityId: randomUUID(),
    organizationId: randomUUID(),
    ...override,
  }
  return pet
}
