import type { CheckIn, Prisma } from '@prisma/client'
import type { ICheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/db/prisma'

export class PrismaCheckinRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInCreateInput): Promise<CheckIn> {
    return await prisma.checkIn.create({
      data,
    })
  }
}
