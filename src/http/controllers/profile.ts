import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // const profileBodySchema = z.object({
  //   userId: z.string().uuid(),
  // })

  // const { userId } = profileBodySchema.parse(request.body)

  // try {
  //   const profileteUseCase = makeGetUserProfileUseCase()

  //   const { user } = await profileteUseCase.execute({ userId })

  //   return reply.status(200).send(user)
  // } catch (error) {
  //   if (error instanceof InvalidCredentialsError) {
  //     return reply.status(400).send({ message: error.message })
  //   }
  //   throw error
  // }

  return reply.status(200).send()
}
