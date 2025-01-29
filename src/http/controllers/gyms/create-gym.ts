import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function createGym(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    phone: z.string().optional(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body)

  try {
    const createGymUseCase = makeCreateGymUseCase()

    const gym = await createGymUseCase.execute({
      title,
      description: description || null,
      phone: phone || null,
      latitude,
      longitude,
    })

    return reply.status(201).send(gym)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
