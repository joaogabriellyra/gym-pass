import type { CheckIn } from '@prisma/client'

export interface ICheckInRepository {
  findOneById(id: string): Promise<CheckIn | null>
}
