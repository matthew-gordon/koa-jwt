const koaJwt = require('koa-jwt')

module.exports = koaJwt({
  getToken(ctx, opts) {
    const {authorization} = ctx.header

    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      return authorization.split(' ')[1]
    }

    return null
  },
  secret: process.env.TOKEN_SECRET,
  passthrough: true,
  key: 'jwt'
})
