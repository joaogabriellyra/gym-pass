import type { Prisma, User } from '@prisma/client'

export interface IUsersRepository {
  findOneById(id: string): Promise<User | null>
  findOneByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
