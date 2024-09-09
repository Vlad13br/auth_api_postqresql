const rateLimit = require('express-rate-limit')

const limiter = (duration, limit) => {
  return rateLimit({
    windowMs: duration,
    max: limit,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) => {
      return res.status(429).json({
        status: 'error',
        code:429,
        message: 'Too many requests, please try again later.',
      })
    },
  })
}

module.exports = limiter