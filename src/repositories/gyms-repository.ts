import type { Gym } from '@prisma/client'

export interface IGymsRepository {
  findOneById(id: string): Promise<Gym | null>
}
