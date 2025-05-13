import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '../../src/tests/repositories/in-memory-organizations-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUseCase(organizationsRepository)
  })

  it('shoud be able to register', async () => {
    const { organization } = await sut.execute({
      name: 'organization name',
      email: 'email@email.com',
      password: '123456',
      author_name: 'John Doe',
      cep: '12345678',
      street: 'Street name',
      city: 'City name',
      latitude: -23.123456,
      longitude: -46.123456,
      neighborhood: 'Neighborhood name',
      phone: '123456789',
      state: 'State name',
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization.name).toEqual('organization name')
  })

  it('shoud hash user password user registration', async () => {
    const { organization } = await sut.execute({
      name: 'organization name',
      email: 'email@email.com',
      password: '123456',
      author_name: 'John Doe',
      cep: '12345678',
      street: 'Street name',
      city: 'City name',
      latitude: -23.123456,
      longitude: -46.123456,
      neighborhood: 'Neighborhood name',
      phone: '123456789',
      state: 'State name',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('shoud not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'organization name',
      email,
      password: '123456',
      author_name: 'John Doe',
      cep: '12345678',
      street: 'Street name',
      city: 'City name',
      latitude: -23.123456,
      longitude: -46.123456,
      neighborhood: 'Neighborhood name',
      phone: '123456789',
      state: 'State name',
    })

    await expect(() =>
      sut.execute({
        name: 'organization name',
        email,
        password: '123456',
        author_name: 'John Doe',
        cep: '12345678',
        street: 'Street name',
        city: 'City name',
        latitude: -23.123456,
        longitude: -46.123456,
        neighborhood: 'Neighborhood name',
        phone: '123456789',
        state: 'State name',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
