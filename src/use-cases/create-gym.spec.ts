import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'
import { Decimal } from '@prisma/client/runtime/library'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Green',
      description: 'Vem ser Green!',
      latitude: -8.0379534,
      longitude: -35.0391105,
      phone: '8132238679',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
