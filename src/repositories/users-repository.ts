import type { Prisma, User } from '@prisma/client'

export interface IUsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findOneByEmail(email: string): Promise<User | null>
}
