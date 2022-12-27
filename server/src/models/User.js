/* eslint-disable no-underscore-dangle */
import { Schema, model } from 'mongoose'
import { randomBytes } from 'crypto'
import { genSalt, hash, compare } from 'bcrypt'
import { RefreshToken } from './index.js'
import configs from '../utils/configs.js'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['admin', 'user', 'moderator'],
      required: true,
    },
  },
  { timestamps: true }
)

async function generateRefreshToken() {
  const token = randomBytes(64).toString('hex')
  const expireDate = new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000)

  const refreshToken = await RefreshToken.create({
    token: token,
    userId: this._id,
    expiresAt: expireDate,
  })

  return refreshToken.token
}

function generateAccessToken() {
  return jwt.sign(
    {
      userId: this._id,
      role: this.role,
    },
    configs.jwt.secret,
    { expiresIn: configs.jwt.lifeTime }
  )
}

async function isPasswordMatch(candidatePassword) {
  const isMatch = await compare(candidatePassword, this.password)
  return isMatch
}

// eslint-disable-next-line func-names
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
})

userSchema.methods = {
  generateRefreshToken,
  generateAccessToken,
  isPasswordMatch,
}

export default model('User', userSchema)
