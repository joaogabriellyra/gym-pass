import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInBodySchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInBodySchema.parse(request.body)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  const { checkIn } = await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(20).send({ checkIn })
}
