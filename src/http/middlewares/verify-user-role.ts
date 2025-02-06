import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return (reply: FastifyReply, request: FastifyRequest) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return reply.status(401).send({
        message: 'Unauthorized.',
      })
    }
  }
}
