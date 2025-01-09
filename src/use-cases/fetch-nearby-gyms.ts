import type { IGymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<void> {
    // const gyms = await this.gymsRepository.searchMany(query, page)
    // return {
    //   gyms,
    // }
  }
}
