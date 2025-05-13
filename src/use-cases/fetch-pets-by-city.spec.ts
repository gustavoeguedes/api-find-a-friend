import { beforeEach, expect, describe, it } from 'vitest'
import { InMemoryPetsRepository } from '../tests/repositories/in-memory-pets-repository'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'
import { makePet } from '../tests/factories/make-pet'
import { InMemoryOrganizationsRepository } from '../tests/repositories/in-memory-organizations-repository'
import { makeOrganization } from '../tests/factories/make-organization'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: FetchPetsByCityUseCase

describe('Fetch Pets by city Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should be able to fetch pets by cityId', async () => {
    const org = await organizationsRepository.create(
      makeOrganization({ city: 'my-city' }),
    )
    for (let i = 1; i <= 9; i++) {
      const pet = makePet({
        organization_id: org.id,
      })
      petsRepository.items.push(pet)
    }

    const org2 = await organizationsRepository.create(
      makeOrganization({ city: 'other-city' }),
    )

    const otherPet = makePet({
      organization_id: org2.id,
    })

    petsRepository.items.push(otherPet)

    const { pets } = await sut.execute({
      city: 'my-city',
    })

    expect(pets).toHaveLength(9)
  })

  it('should be able to fetch pets by city and age', async () => {
    const org = await organizationsRepository.create(makeOrganization())

    await petsRepository.create(makePet({ organization_id: org.id, age: '1' }))
    await petsRepository.create(makePet({ organization_id: org.id, age: '2' }))

    const { pets } = await sut.execute({ city: org.city, age: '1' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and size', async () => {
    const org = await organizationsRepository.create(makeOrganization())

    await petsRepository.create(
      makePet({ organization_id: org.id, size: 'small' }),
    )
    await petsRepository.create(
      makePet({ organization_id: org.id, size: 'medium' }),
    )
    await petsRepository.create(
      makePet({ organization_id: org.id, size: 'large' }),
    )

    const { pets } = await sut.execute({ city: org.city, size: 'small' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and energy_level', async () => {
    const org = await organizationsRepository.create(makeOrganization())

    await petsRepository.create(
      makePet({ organization_id: org.id, energy_level: 'low' }),
    )
    await petsRepository.create(
      makePet({ organization_id: org.id, energy_level: 'medium' }),
    )
    await petsRepository.create(
      makePet({ organization_id: org.id, energy_level: 'high' }),
    )

    const { pets } = await sut.execute({ city: org.city, energy_level: 'low' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and environment', async () => {
    const org = await organizationsRepository.create(makeOrganization())

    await petsRepository.create(
      makePet({ organization_id: org.id, environment: 'indoor' }),
    )
    await petsRepository.create(
      makePet({ organization_id: org.id, environment: 'outdoor' }),
    )

    const { pets } = await sut.execute({
      city: org.city,
      environment: 'indoor',
    })

    expect(pets).toHaveLength(1)
  })
})
