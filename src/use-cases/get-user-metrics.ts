import type { ICheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkIns: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<void> {
    // const checkIns = await this.checkInsRepository.
  }
}
