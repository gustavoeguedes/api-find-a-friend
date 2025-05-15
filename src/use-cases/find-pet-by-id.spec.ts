import { beforeEach, expect, describe, it } from 'vitest'
import { InMemoryPetsRepository } from '../tests/repositories/in-memory-pets-repository'
import { makePet } from '../tests/factories/make-pet'
import { FindPetByIdUseCase } from './find-pet-by-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryOrganizationsRepository } from '../tests/repositories/in-memory-organizations-repository'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: FindPetByIdUseCase

describe('Find Pet By Id Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new FindPetByIdUseCase(petsRepository)
  })

  it('should be able to find pet by id', async () => {
    const newPet = makePet({
      id: 'my-pet-id',
    })

    petsRepository.items.push(newPet)

    const { pet } = await sut.execute({
      id: 'my-pet-id',
    })

    expect(pet).toEqual(newPet)
  })

  it('should not be able to find pet by id', async () => {
    const newPet = makePet({
      id: 'my-pet-id',
    })

    petsRepository.items.push(newPet)

    await expect(() =>
      sut.execute({
        id: 'non-existing-pet-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
