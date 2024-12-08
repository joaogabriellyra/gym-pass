import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const password = '123456'

    const {
      user: { password_hash },
    } = await registerUseCase.execute({
      name: 'Linus Torvalds',
      email: 'linus.torvalds@example.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(password, password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'linus.torvalds@example.com'

    await registerUseCase.execute({
      name: 'Linus Torvalds',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'Linus Torvalds',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Linus Torvalds',
      email: 'linus.torvalds@example.com',
      password: '123456',
    })

    expect(user.created_at).toEqual(expect.any(Date))
  })
})
