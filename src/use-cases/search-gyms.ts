import type { IGymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface SearchGymsUseCaseRequest {
  name: string
}

interface SearchGymsUseCaseResponse {
  gym: Gym
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({ name }: SearchGymsUseCaseRequest): Promise<void> {}
}
