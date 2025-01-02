import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in User Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.gyms.push({
      title: 'Green',
      description: 'Vem ser Green!',
      id: 'gym-id-1',
      latitude: new Decimal(-8.0379534),
      longitude: new Decimal(-35.0391105),
      phone: '8132238679',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: -8.0379534,
      userLongitude: -35.0391105,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2020, 11, 22, 20))

    await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: -8.0379534,
      userLongitude: -35.0391105,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id-1',
        userId: 'user-id-1',
        userLatitude: -8.0379534,
        userLongitude: -35.0391105,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2020, 11, 22, 20))

    await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: -8.0379534,
      userLongitude: -35.0391105,
    })

    vi.setSystemTime(new Date(2020, 11, 23, 20))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: -8.0379534,
      userLongitude: -35.0391105,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on a distant gym', async () => {
    await expect(() =>
      sut.execute({
        gymId: 'gym-id-1',
        userId: 'user-id-1',
        userLatitude: -8.0582682,
        userLongitude: -34.961686,
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
