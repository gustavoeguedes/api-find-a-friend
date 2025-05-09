import { beforeEach, expect, describe, it } from 'vitest'
import { InMemoryPetsRepository } from '../tests/repositories/in-memory-pets-repository'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'
import { makePet } from '../tests/factories/make-pet'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCityUseCase

describe('Fetch Pets by city Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should be able to fetch pets by cityId', async () => {
    for (let i = 1; i <= 12; i++) {
      const pet = makePet({
        cityId: 'my-city-id',
      })
      petsRepository.items.push(pet)
    }

    const otherPet = makePet({
      cityId: 'other-city-id',
    })

    petsRepository.items.push(otherPet)

    const { pets } = await sut.execute({
      cityId: 'my-city-id',
    })

    expect(pets).toHaveLength(10)
  })

  it('should be able to fetch pets by cityId and age', async () => {
    const pet = makePet({
      cityId: 'my-city-id',
      age: 5,
    })

    petsRepository.items.push(pet)

    const otherPet = makePet({
      cityId: 'my-city-id',
      age: 10,
    })

    petsRepository.items.push(otherPet)

    const { pets } = await sut.execute({
      cityId: 'my-city-id',
      age: 5,
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to fetch pets by cityId and type', async () => {
    const pet = makePet({
      cityId: 'my-city-id',
      type: 'DOG',
    })

    petsRepository.items.push(pet)

    const otherPet = makePet({
      cityId: 'my-city-id',
      type: 'CAT',
    })

    petsRepository.items.push(otherPet)

    const { pets } = await sut.execute({
      cityId: 'my-city-id',
      type: 'DOG',
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to fetch pets by cityId and organizationId', async () => {
    const pet = makePet({
      cityId: 'my-city-id',
      organizationId: 'my-organization-id',
    })

    petsRepository.items.push(pet)

    const otherPet = makePet({
      cityId: 'my-city-id',
      organizationId: 'other-organization-id',
    })

    petsRepository.items.push(otherPet)

    const { pets } = await sut.execute({
      cityId: 'my-city-id',
      organizationId: 'my-organization-id',
    })

    expect(pets).toHaveLength(1)
  })
})
