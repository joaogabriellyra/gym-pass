import type { CheckIn, Prisma } from '@prisma/client'

export interface ICheckInsRepository {
  create(data: Prisma.CheckInCreateInput): Promise<CheckIn>
}
