import request from 'supertest'
import app from '../../src/app.js'

describe('API endpoint not found', () => {
  it('should return a 404 status code and a message indicating the route does not exist', async () => {
    const response = await request(app).get('/api/invalid-endpoint')

    expect(response.status).toEqual(404)
    expect(response.body).toMatchObject({ msg: 'Route does not exist' })
  })
})
