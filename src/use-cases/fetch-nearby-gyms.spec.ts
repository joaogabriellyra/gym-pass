import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms User Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })
  it('should be able to find nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Green',
      description: 'Vem ser Green!',
      latitude: -8.0379534,
      longitude: -35.0391105,
      phone: '8132238679',
    })

    await gymsRepository.create({
      title: 'Selfit',
      description: 'Vem ser Selfit!',
      latitude: -8.0486663,
      longitude: -34.9596037,
      phone: '',
    })

    await gymsRepository.create({
      title: 'Smartfit',
      description: 'Vem ser Smart!',
      latitude: -8.0357729,
      longitude: -34.9488992,
      phone: '',
    })

    await gymsRepository.create({
      title: 'Hi Academia Candeias',
      description: 'Hi',
      latitude: -8.2102787,
      longitude: -34.9249907,
      phone: '081998010247',
    })

    const { nearbyGyms } = await sut.execute({
      userLatitude: -8.0521627,
      userLongitude: -34.9590755,
    })

    expect(nearbyGyms).toHaveLength(3)
    expect(nearbyGyms).toEqual([
      expect.objectContaining({ title: 'Green' }),
      expect.objectContaining({ title: 'Selfit' }),
      expect.objectContaining({ title: 'Smartfit' }),
    ])
  })
})
