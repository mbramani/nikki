import request from 'supertest'
import app from '../../../src/app.js'

export const postToForgotPassword = (dataToSend) =>
  request(app).post('/api/user/forgot-password').send(dataToSend)

export const postToResetPassword = (dataToSend) =>
  request(app).post('/api/user/reset-password').send(dataToSend)
