import type { IGymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface GetGymByNameUseCaseRequest {
  name: string
}

interface GetGymByNameUseCaseResponse {
  gym: Gym
}

export class GetGymByNameUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({ name }: GetGymByNameUseCaseRequest): Promise<void> {}
}
