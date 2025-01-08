import type { ICheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  howManyCheckIns: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const howManyCheckIns = await this.checkInsRepository.countByUserId(userId)

    return {
      howManyCheckIns,
    }
  }
}
