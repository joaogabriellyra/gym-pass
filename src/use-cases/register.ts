import type { IUsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  email: string
  password: string
  name: string
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, name, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findOneByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
