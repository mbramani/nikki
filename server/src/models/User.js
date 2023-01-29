import { Schema, model } from 'mongoose'
import { randomBytes } from 'crypto'
import { genSalt, hash, compare } from 'bcrypt'
import { Token } from './index.js'
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
      maxLength: [50, 'name should have a maximum length of 50'],
      minLength: [3, 'name should have a minimum length of 3'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'please provide a email'],
      match: [emailRegExp, 'please provide a valid email'],
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
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
  {
    statics: {
      findByUserId(userId) {
        return this.findOne({ _id: userId })
      },

      findByEmail(email) {
        return this.findOne({ email })
      },
    },

    methods: {
      async generateRefreshToken() {
        const tokenRecord = await Token.create({
          refresh: {
            token: randomBytes(64).toString('hex'),
            expiresAt: new Date(
              Date.now() + parseInt(configs.refreshToken.lifeTime, 10)
            ),
            isActive: true,
          },
          passwordReset: {
            token: null,
            expiresAt: null,
          },
          userId: this._id,
        })

        return tokenRecord.refresh.token
      },

      async updateRefreshToken() {
        const filter = { userId: this._id }
        const update = {
          refresh: {
            token: randomBytes(64).toString('hex'),
            expiresAt: new Date(
              Date.now() + parseInt(configs.refreshToken.lifeTime, 10)
            ),
            isActive: true,
          },
        }

        const tokenRecord = await Token.findOneAndUpdate(filter, update, {
          new: true,
        })

        return tokenRecord.refresh.token
      },

      async generateResetPasswordToken() {
        const filter = { userId: this._id }
        const update = {
          resetPassword: {
            token: randomBytes(64).toString('hex'),
            expiresAt: new Date(
              Date.now() + parseInt(configs.resetPasswordToken.lifeTime, 10)
            ),
          },
        }

        const tokenRecord = await Token.findOneAndUpdate(filter, update, {
          new: true,
        })

        return tokenRecord.resetPassword.token
      },

      generateJwtToken() {
        return jwt.sign(
          {
            userId: this._id,
            role: this.role,
          },
          configs.jwt.secret,
          { expiresIn: configs.jwt.lifeTime }
        )
      },

      isPasswordMatch(candidatePassword) {
        return compare(candidatePassword, this.password)
      },
    },
    timestamps: true,
  }
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
})

const User = model('User', userSchema)

export default User
