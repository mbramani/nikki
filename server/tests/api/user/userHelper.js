import request from 'supertest'
import app from '../../../src/app.js'

export const getToUser = (accessToken) =>
  request(app)
    .get('/api/user/')
    .set({ authorization: `Bearer ${accessToken}` })

export const patchToUser = (dataToSend, accessToken) =>
  request(app)
    .patch('/api/user/')
    .set({ authorization: `Bearer ${accessToken}` })
    .send(dataToSend)

export const patchToUpdatePassword = (dataToSend, accessToken) =>
  request(app)
    .patch('/api/user/update-password')
    .set({ authorization: `Bearer ${accessToken}` })
    .send(dataToSend)

export const postToForgotPassword = (dataToSend) =>
  request(app).post('/api/user/forgot-password').send(dataToSend)

export const postToResetPassword = (dataToSend) =>
  request(app).post('/api/user/reset-password').send(dataToSend)

export const getAccessToken = async (userData) => {
  const res = await request(app).post('/api/auth/register').send(userData)

  return res.body.accessToken
}
