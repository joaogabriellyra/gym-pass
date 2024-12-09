import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { GetUserProfileUseCase } from './get-user-profile'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  it('should be able to get a user profile using his id', async () => {
    const createdUser = await usersRepository.create({
      name: 'Linus Torvalds',
      email: 'linus.torvalds@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user: getUserById } = await sut.execute({ userId: createdUser.id })
    expect(getUserById.id).toEqual(expect.any(String))
    expect(getUserById.name).toEqual('Linus Torvalds')
  })

  it('should not be able to get a user profile with wrong id', async () => {
    const createdUser = await usersRepository.create({
      name: 'Linus Torvalds',
      email: 'linus.torvalds@example.com',
      password_hash: await hash('123456', 6),
    })

    const wrongId = 'non-existing-id'

    await expect(() => sut.execute({ userId: wrongId })).rejects.toBeInstanceOf(
      InvalidCredentialsError
    )
  })
})
