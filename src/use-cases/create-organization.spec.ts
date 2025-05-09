import { beforeEach, expect, describe, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { InMemoryOrganizationsRepository } from '../tests/repositories/in-memory-organizations-repository'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create a organization', async () => {
    const { organization } = await sut.execute({
      name: 'My org',
      address: 'my address',
      phone: '123456789',
    })

    expect(organization.id).toEqual(expect.any(String))
  })
})
