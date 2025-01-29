import type { FastifyInstance } from 'fastify'
import { createGym } from './create-gym'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/create-gym', createGym)
}
