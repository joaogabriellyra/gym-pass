import type { IUsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import type { User } from '@prisma/client'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findOneById(userId)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
