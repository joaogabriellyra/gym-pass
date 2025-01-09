import type { IGymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  nearbyGyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const nearbyGyms = await this.gymsRepository.findManyNearby(
      userLatitude,
      userLongitude
    )

    return {
      nearbyGyms,
    }
  }
}
