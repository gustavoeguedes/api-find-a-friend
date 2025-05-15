import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '../../src/tests/repositories/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { GetOrganizationProfileUseCase } from './get-organization-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { makeOrganization } from '../tests/factories/make-organization'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: GetOrganizationProfileUseCase

describe('Get Organization Profile Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new GetOrganizationProfileUseCase(organizationsRepository)
  })
  it('shoud be able to get organization profile', async () => {
    const myOrganization = makeOrganization({
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      name: 'John Doe',
    })
    const createdOrganization =
      await organizationsRepository.create(myOrganization)

    const { organization } = await sut.execute({
      organizationId: createdOrganization.id,
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization.name).toEqual('John Doe')
  })

  it('shoud not be able to get organization profile with wrong id', async () => {
    await expect(
      sut.execute({
        organizationId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
