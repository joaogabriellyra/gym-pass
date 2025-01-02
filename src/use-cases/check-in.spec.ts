import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in User Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2020, 11, 22, 20))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2020, 11, 22, 20))

    await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id-1',
        userId: 'user-id-1',
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2020, 11, 22, 20))

    await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
    })

    vi.setSystemTime(new Date(2020, 11, 23, 20))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
