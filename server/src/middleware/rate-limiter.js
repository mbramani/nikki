import rateLimit from 'express-rate-limit'

const isInProduction = () => process.env.NODE_ENV === 'production'

const rateLimiter = (windowMs, limit) =>
  rateLimit({
    windowMs: isInProduction() ? windowMs : 15 * 60 * 1000,
    max: isInProduction() ? limit : 1000,
    message: {
      msg: `Too many requests from this IP, please try again after ${windowMs} ms`,
    },
  })

export default rateLimiter
