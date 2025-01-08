import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics User Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })
  it('should be able to get how many check-ins a user has', async () => {
    const userId = 'user-id-01'

    await checkInsRepository.create({
      gym_id: 'gym-id-01',
      user_id: userId,
    })

    await checkInsRepository.create({
      gym_id: 'gym-id-02',
      user_id: userId,
    })

    await checkInsRepository.create({
      gym_id: 'gym-id-01',
      user_id: userId,
    })

    const { howManyCheckIns } = await sut.execute({ userId })

    expect(howManyCheckIns).toEqual(3)
  })
})
