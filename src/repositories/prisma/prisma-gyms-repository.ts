import type { Gym, Prisma } from '@prisma/client'
import type { IGymsRepository } from '../gyms-repository'
import { prisma } from '@/db/prisma'

export class PrismaGymsRepository implements IGymsRepository {
  findManyNearby(userLatitude: number, userLongitude: number): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }
  searchMany(query: string, page: number): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
