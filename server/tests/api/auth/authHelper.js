import request from 'supertest'
import app from '../../../src/app.js'

export const postToRegister = (dataToSend) =>
  request(app).post('/api/auth/register').send(dataToSend)

export const postToLogin = (dataToSend) => request(app).post('/api/auth/login').send(dataToSend)

export const postToToken = (dataToSend) =>
  request(app)
    .post('/api/auth/token')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send(dataToSend)
