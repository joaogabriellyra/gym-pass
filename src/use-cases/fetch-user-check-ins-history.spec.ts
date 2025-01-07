import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in History User Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    const userId = 'user-id-01'
    const gymId = 'gym-id-01'

    const threeInsertions = Array.from({ length: 3 }).map(() =>
      checkInsRepository.create({
        gym_id: gymId,
        user_id: userId,
      })
    )

    await Promise.all(threeInsertions)

    const checkIns = await checkInsRepository.findManyByUserId(userId)

    expect(
      checkIns.every(
        checkin =>
          'id' in checkin && 'user_id' in checkin && 'gym_id' in checkin
      )
    ).toBe(true)
  })
})
