import type { CheckIn, Prisma } from '@prisma/client'
import type { ICheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/db/prisma'

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async findById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    })

    return checkIn
  }
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    throw new Error('Method not implemented.')
  }
  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const manyCheckIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return manyCheckIns
  }
  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }
  async save(checkIn: CheckIn): Promise<void> {
    await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    })
  }
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }
}
