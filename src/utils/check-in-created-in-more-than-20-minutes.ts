import type { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

export function checkInCreatedInMoreThanTwentyMinutes(checkIn: CheckIn) {
  const checkInCreatedAt = dayjs(checkIn.created_at)
  const now = dayjs()

  return now.diff(checkInCreatedAt, 'minute') > 20
}
