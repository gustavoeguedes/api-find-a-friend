import { beforeEach, expect, describe, it } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
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
    for (let i = 1; i <= 10; i++) {
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
})
