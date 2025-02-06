import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Green',
        description: 'Vem ser Green!',
        phone: '8132238679',
        latitude: -8.0379534,
        longitude: -35.0391105,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Smartfit',
        description: 'Vem ser Smart!',
        latitude: -8.0379534,
        longitude: -35.0391105,
        phone: '',
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Selfit',
        description: 'Vem ser Selfit!',
        latitude: -8.0379534,
        longitude: -35.0391105,
        phone: '',
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ q: 'fit' })
      .set('Authorization', `Bearer ${token}`)
      .send({
        page: 1,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(2)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'Selfit' }),
      expect.objectContaining({ title: 'Smartfit' }),
    ])
  })
})
