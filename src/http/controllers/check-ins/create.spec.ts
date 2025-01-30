import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to check-in', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john.doe@gmail.com',
      password: '123456',
    })

    const token = authResponse.body.token

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    const userId = profileResponse.body.user.id

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 'gym-id-1',
        title: 'Green',
        description: 'Vem ser Green!',
        phone: '8132238679',
        latitude: -8.0379534,
        longitude: -35.0391105,
      })

    const response = await request(app.server)
      .post('/check-ins/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        gymId: 'gym-id-1',
        latitude: -8.0379534,
        longitude: -35.0391105,
        userId,
      })

    console.log(response.body)

    // expect(response.statusCode).toEqual(201)
  })
})
