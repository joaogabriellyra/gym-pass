import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Check-in User Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check in', async () => {
    const checkIn = await checkInsRepository.create({
      gym_id: 'gym-id-01',
      user_id: 'user-id-01',
    })

    const validatedCheckIn = await sut.execute({ checkInId: checkIn.id })

    expect(validatedCheckIn.checkIn.validated_at).not.null
    expect(validatedCheckIn.checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.checkIns[0].validated_at).toEqual(
      expect.any(Date)
    )
  })

  it('should not be able to validate a check in with wrong id', async () => {
    const checkIn = await checkInsRepository.create({
      gym_id: 'gym-id-01',
      user_id: 'user-id-01',
    })

    await expect(() =>
      sut.execute({ checkInId: 'wrong-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate a check in 20 minutes after its creation', async () => {
    vi.setSystemTime(new Date(2025, 0, 14, 19))
    const twentyOneMinutesInMs = 1000 * 60 * 21

    const checkIn = await checkInsRepository.create({
      gym_id: 'gym-id-01',
      user_id: 'user-id-01',
    })

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({ checkInId: checkIn.id })
    ).rejects.toBeInstanceOf(Error)
  })
})
