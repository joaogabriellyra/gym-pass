import type { Prisma, User } from '@prisma/client'
import type { IUsersRepository } from '../users-repository'
import { hash } from 'bcryptjs'

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = []
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: 'user-1',
      name: 'Linus Torvalds',
      email: 'linus.torvalds@example.com',
      created_at: new Date(),
      password_hash: await hash('123456', 6),
    }

    const sameEmailUsedTwice = await this.findOneByEmail(user.email)
    if (sameEmailUsedTwice) {
      throw new Error('email already in use')
    }

    this.items.push(user)

    return user
  }
  async findOneByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email)
    if (!user) {
      return null
    }
    return user
  }
}
