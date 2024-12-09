import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should hash user password upon registration', async () => {
    const password = '123456'

    const {
      user: { password_hash },
    } = await sut.execute({
      name: 'Linus Torvalds',
      email: 'linus.torvalds@example.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(password, password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same email twice', async () => {
    const email = 'linus.torvalds@example.com'

    await sut.execute({
      name: 'Linus Torvalds',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Linus Torvalds',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Linus Torvalds',
      email: 'linus.torvalds@example.com',
      password: '123456',
    })

    expect(user.created_at).toEqual(expect.any(Date))
  })
})
