import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../../repositories/users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      organizationId: data.organizationId ?? null,
      role: 'ORGANIZATION',
    }
    this.items.push(user)
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => (item.email = email))

    if (!user) {
      return null
    }
    return user
  }
}
