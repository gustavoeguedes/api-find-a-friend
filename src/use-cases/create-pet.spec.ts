import { beforeEach, expect, describe, it } from 'vitest'
import { InMemoryPetsRepository } from '../tests/repositories/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { InMemoryOrganizationsRepository } from '../tests/repositories/in-memory-organizations-repository'
import { makeOrganization } from '../tests/factories/make-organization'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new CreatePetUseCase(petsRepository, organizationsRepository)
  })

  it('should be able to create a pet', async () => {
    const org = await organizationsRepository.create(
      makeOrganization({ id: 'org-1' }),
    )
    const { pet } = await sut.execute({
      name: 'John Doe',
      age: '2',
      organization_id: org.id,
      about: 'A friendly dog',
      size: 'medium',
      energy_level: 'high',
      environment: 'indoors',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('John Doe')
    expect(pet.age).toEqual('2')
  })
})
