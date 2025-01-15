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
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    throw new Error('Method not implemented.')
  }
  countByUserId(userId: string): Promise<number> {
    throw new Error('Method not implemented.')
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
