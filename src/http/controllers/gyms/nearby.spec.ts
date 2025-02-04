import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Green',
        description: 'Vem ser Green!',
        phone: '8132238679',
        latitude: -8.0379534,
        longitude: -35.0391105,
      })

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Smartfit',
        description: 'Vem ser Smart!',
        latitude: -8.0357729,
        longitude: -34.9488992,
        phone: '',
      })

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Selfit',
        description: 'Vem ser Selfit!',
        latitude: -8.0486663,
        longitude: -34.9596037,
        phone: '',
      })

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Hi Academia Candeias',
        description: 'Hi',
        latitude: -8.2102787,
        longitude: -34.9249907,
        phone: '081998010247',
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -8.0521627,
        longitude: -34.9590755,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.nearbyGyms).toHaveLength(3)
    expect(response.body.nearbyGyms).toEqual([
      expect.objectContaining({ title: 'Green' }),
      expect.objectContaining({ title: 'Smartfit' }),
      expect.objectContaining({ title: 'Selfit' }),
    ])
  })
})
