import { Schema, model, Types } from 'mongoose'

const tokenSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    refresh: {
      token: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      expiresAt: {
        type: Date,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    resetPassword: {
      token: {
        type: String,
        default: null,
        index: true,
      },
      expiresAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    statics: {
      findByUserId(userId) {
        return this.findOne({ userId })
      },

      findByRefreshToken(token) {
        return this.findOne({ 'refresh.token': token })
      },

      findByResetPasswordToken(token) {
        return this.findOne({ 'resetPassword.token': token })
      },
    },
    timestamps: true,
  }
)

const Token = model('Token', tokenSchema)

export default Token
