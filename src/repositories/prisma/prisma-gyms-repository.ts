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
  async searchMany(query: string, page: number): Promise<Gym[]> {
    const manyGyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      orderBy: {
        title: 'asc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return manyGyms
  }
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
