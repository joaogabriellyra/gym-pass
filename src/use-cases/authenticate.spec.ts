import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate User Case', () => {
  it('should not be able to authenticate with a unused email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    const passwordHashed = await hash('123456', 6)
    const registeredEmail = 'linus.torvalds@example.com'
    const unusedEmail = 'jgabriellyra@hotmail.com'

    const user = await usersRepository.create({
      name: 'Linus Torvalds',
      email: registeredEmail,
      password_hash: passwordHashed,
    })

    await expect(() =>
      sut.execute({
        email: unusedEmail,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with a wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    const passwordHashed = await hash('123456', 6)
    const registeredEmail = 'linus.torvalds@example.com'
    const wrongPassword = '654321'

    const user = await usersRepository.create({
      name: 'Linus Torvalds',
      email: registeredEmail,
      password_hash: passwordHashed,
    })

    await expect(() =>
      sut.execute({
        email: registeredEmail,
        password: wrongPassword,
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    const passwordHashed = await hash('123456', 6)
    const registeredEmail = 'linus.torvalds@example.com'

    await usersRepository.create({
      name: 'Linus Torvalds',
      email: registeredEmail,
      password_hash: passwordHashed,
    })

    const { user } = await sut.execute({
      email: registeredEmail,
      password: '123456',
    })

    expect(user.email).toBe(registeredEmail)
  })
})
