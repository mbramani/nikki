/* eslint-disable no-underscore-dangle */
import { Schema, model } from 'mongoose'
import { randomBytes } from 'crypto'
import { genSalt, hash, compare } from 'bcrypt'
import { RefreshToken } from './index.js'
import configs from '../utils/configs.js'
import jwt from 'jsonwebtoken'

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegExp = /[0-9a-zA-Z@#$%]{6,18}/

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide a name'],
      maxlength: [50, 'name should have a maximum length of 50'],
      minlength: [3, 'name should have a minimum length of 3'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'please provide a email'],
      match: [emailRegExp, 'please provide a valid email'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'please provide a password'],
      minlength: [6, 'password should have a minimum length of 6 characters'],
      match: [passwordRegExp, 'please provide a valid password'],
      trim: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['admin', 'user', 'moderator'],
    },
  },
  { timestamps: true }
)

async function generateRefreshToken() {
  const token = randomBytes(64).toString('hex')
  const expireDate = new Date(
    Date.now() + parseInt(configs.refreshToken.lifeTime, 10)
  )

  const refreshToken = await RefreshToken.create({
    token: token,
    userId: this._id,
    expiresAt: expireDate,
  })

  return refreshToken.token
}

async function updateRefreshToken() {
  const token = randomBytes(64).toString('hex')
  const expireDate = new Date(
    Date.now() + parseInt(configs.refreshToken.lifeTime, 10)
  )

  const filter = { userId: this._id }
  const update = {
    token: token,
    expiresAt: expireDate,
  }

  const refreshToken = await RefreshToken.findOneAndUpdate(filter, update, {
    new: true,
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

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
})

userSchema.methods = {
  generateRefreshToken,
  generateAccessToken,
  updateRefreshToken,
  isPasswordMatch,
}

export default model('User', userSchema)
