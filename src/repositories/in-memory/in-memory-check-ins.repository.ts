import type { Prisma, CheckIn } from '@prisma/client'
import type { ICheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public checkIns: CheckIn[] = []

  async save(checkIn: CheckIn): Promise<void> {
    const checkInIndex = this.checkIns.findIndex(
      check => check.id === checkIn.id
    )

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn
    }
  }

  async findById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = this.checkIns.find(checkIn => checkIn.id === checkInId)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async countByUserId(userId: string): Promise<number> {
    const howManyCheckIns = this.checkIns.filter(
      checkin => checkin.user_id === userId
    ).length

    return howManyCheckIns
  }
  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkins = this.checkIns
      .filter(checkin => checkin.user_id === userId)
      .slice((page - 1) * 20, page * 20)

    return checkins
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInWithoutDateValidation = this.checkIns.find(checkIn => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInWithoutDateValidation) {
      return null
    }

    return checkInWithoutDateValidation
  }
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}
