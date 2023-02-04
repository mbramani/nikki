import request from 'supertest'
import app from '../../../src/app.js'

export const getAccessToken = async () => {
  const res = await request(app).post('/api/auth/register').send({
    name: 'John',
    email: 'john@example.com',
    password: 'Test@123',
  })

  return res.body.accessToken
}

export const getToPage = ({ year, month, day }, accessToken) =>
  request(app)
    .get(`/api/page/${year}/${month}/${day}`)
    .set({ authorization: `Bearer ${accessToken}` })

export const postToPage = ({ year, month, day }, accessToken, dataToSend) =>
  request(app)
    .post(`/api/page/${year}/${month}/${day}`)
    .set({ authorization: `Bearer ${accessToken}` })
    .send(dataToSend)

export const patchToPage = ({ year, month, day }, accessToken, dataToSend) =>
  request(app)
    .patch(`/api/page/${year}/${month}/${day}`)
    .set({ authorization: `Bearer ${accessToken}` })
    .send(dataToSend)

export const deleteToPage = ({ year, month, day }, accessToken) =>
  request(app)
    .delete(`/api/page/${year}/${month}/${day}`)
    .set({ authorization: `Bearer ${accessToken}` })
