import type { Gym, Prisma } from '@prisma/client'

export interface IGymsRepository {
  findManyNearby(userLatitude: number, userLongitude: number): Promise<Gym[]>
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
