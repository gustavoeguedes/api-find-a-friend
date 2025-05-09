import { beforeEach, expect, describe, it } from 'vitest'
import { InMemoryPetsRepository } from '../tests/repositories/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'John Doe',
      age: 2,
      type: 'DOG',
      cityId: 'my-city-id',
      organizationId: 'org-1',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('John Doe')
    expect(pet.age).toEqual(2)
    expect(pet.type).toEqual('DOG')
    expect(pet.cityId).toEqual('my-city-id')
  })
})
