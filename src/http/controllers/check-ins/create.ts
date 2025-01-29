import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInBodySchema = z.object({
    gymId: z.string(),
    userId: z.string(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId, latitude, longitude, userId } = createCheckInBodySchema.parse(
    request.body
  )

  const createCheckInUseCase = makeCheckInUseCase()

  const { checkIn } = await createCheckInUseCase.execute({
    gymId,
    userId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({ checkIn })
}
