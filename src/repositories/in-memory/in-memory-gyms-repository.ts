import type { Gym, Prisma } from '@prisma/client'
import type { IGymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryGymsRepository implements IGymsRepository {
  public gyms: Gym[] = []

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      description: data.description ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      title: data.title,
      phone: data.phone ?? null,
      created_at: new Date(),
    }

    this.gyms.push(gym)

    return gym
  }
  async findOneById(gymId: string): Promise<Gym | null> {
    const gym = this.gyms.find(gym => gym.id === gymId)
    if (!gym) {
      return null
    }
    return gym
  }
}
