const jwt = require('jsonwebtoken')
const moment = require('moment')

function generateJWTforUser(user = {}) {
  const payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user.id
  }

  const userJwt = Object.assign({}, user, {
    token: jwt.sign(payload, process.env.TOKEN_SECRET, {})
  })

  return userJwt
}

exports.generateJWTforUser = generateJWTforUser
