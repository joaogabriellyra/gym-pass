import type { Gym, Prisma } from '@prisma/client'

export interface IGymsRepository {
  findOneById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
