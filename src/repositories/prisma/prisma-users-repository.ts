import { prisma } from '@/db/prisma'
import type { Prisma } from '@prisma/client'
import type { IUsersRepository } from '../users-repository'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findOneByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}
