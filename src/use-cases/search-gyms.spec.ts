import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms User Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })
  it('should be able to search for gyms', async () => {
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
      latitude: -8.0379534,
      longitude: -35.0391105,
      phone: '',
    })

    await gymsRepository.create({
      title: 'Smartfit',
      description: 'Vem ser Smart!',
      latitude: -8.0379534,
      longitude: -35.0391105,
      phone: '',
    })

    const { gyms } = await sut.execute({
      query: 'fit',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Selfit' }),
      expect.objectContaining({ title: 'Smartfit' }),
    ])
  })

  it('should be able to get a full page of gyms', async () => {
    const twentytwoInsertions = Array.from({ length: 22 }).map((_, index) =>
      gymsRepository.create({
        title: `Selfit-${index}`,
        description: 'Vem ser Selfit!',
        latitude: -8.0379534,
        longitude: -35.0391105,
        phone: '',
      })
    )

    await Promise.all(twentytwoInsertions)

    const { gyms } = await sut.execute({
      query: 'selfit',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Selfit-20' }),
      expect.objectContaining({ title: 'Selfit-21' }),
    ])
  })
})
