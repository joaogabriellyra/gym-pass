import type { Gym } from '@prisma/client'
import type { IGymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements IGymsRepository {
  public gyms: Gym[] = []
  async findOneById(gymId: string): Promise<Gym | null> {
    const gym = this.gyms.find(gym => gym.id === gymId)
    if (!gym) {
      return null
    }
    return gym
  }
}
