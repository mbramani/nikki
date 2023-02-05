import { Schema, model, Types } from 'mongoose'

const pageSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    data: Buffer,
  },
  {
    statics: {
      findByUserId(userId) {
        return this.find({ userId })
      },

      findPage({ userId, year, month, day }) {
        return this.findOne({ userId, year, month, day })
      },
    },
    timestamps: true,
  }
)

pageSchema.index({ userId: 1, year: 1, month: 1, day: 1 })

const Page = model('Page', pageSchema)

export default Page
