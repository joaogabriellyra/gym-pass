import { Gym, Prisma } from '@prisma/client'
import type { IGymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements IGymsRepository {
  findManyNearby(userLatitude: number, userLongitude: number): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }
  findById(id: string): Promise<Gym | null> {
    throw new Error('Method not implemented.')
  }
  searchMany(query: string, page: number): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }
  create(data: Prisma.GymCreateInput): Promise<Gym> {
    throw new Error('Method not implemented.')
  }
}
