import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { howManyCheckIns } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ howManyCheckIns })
}
