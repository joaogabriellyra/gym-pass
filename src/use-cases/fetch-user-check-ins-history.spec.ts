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

    const { checkIns } = await sut.execute({ userId, page: 1 })

    expect(
      checkIns.every(
        checkin =>
          'id' in checkin && 'user_id' in checkin && 'gym_id' in checkin
      )
    ).toBe(true)
  })

  it('should not be able to fetch check-in history with a non-existent id', async () => {
    const wrongId = 'non-existent-id'
    const userId = 'user-id-01'
    const gymId = 'gym-id-01'

    const threeInsertions = Array.from({ length: 3 }).map(() =>
      checkInsRepository.create({
        gym_id: gymId,
        user_id: userId,
      })
    )

    await Promise.all(threeInsertions)

    const { checkIns } = await sut.execute({ userId: wrongId, page: 1 })

    expect(checkIns.length).toBe(0)
  })

  it('should be able to fetch paginated check in history', async () => {
    const userId = 'user-id-01'

    const twentytwoInsertions = Array.from({ length: 22 }).map((_, index) =>
      checkInsRepository.create({
        gym_id: `gym-id-${index}`,
        user_id: userId,
      })
    )

    await Promise.all(twentytwoInsertions)

    const { checkIns } = await sut.execute({
      userId: userId,
      page: 2,
    })

    expect(checkIns.length).toBe(2)
  })
})
