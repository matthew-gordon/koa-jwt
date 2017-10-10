const authHelpers = require('../auth/_helpers')
const {generateJWTforUser} = require('../lib/utils')

module.exports = {

  async post(ctx) {
    const user = ctx.request.body

    try {
      // create user with helper function
      const response = await authHelpers.createUser(user)
      // generate user with token
      const payload = generateJWTforUser(response[0])
      // remove password from
      delete payload.password
      // send token to client
      ctx.status = 200
      ctx.body = {
        status: 'success',
        data: payload
      }
      // handle errors
    } catch (err) {
      ctx.status = 500
      ctx.body = {
        status: 'error',
        err
      }
    }
  },

  async login (ctx) {
    const {username, password} = ctx.request.body

    try {
      // get user from DB with helper function
      const user = await authHelpers.getUser(username)
      // compare password to hash in DB
      const response = await authHelpers.comparePass(password, user.password)
      // generate token for authenticated user
      const payload = generateJWTforUser(user)
      // delete password from payload
      delete payload.password
      // send token to client
      ctx.status = 200
      ctx.body = {
        status: 'success',
        data: payload
      }
    } catch (err) {
      ctx.status = 500
      ctx.body = {
        status: 'error',
        err
      }
    }
  },

  async get (ctx) {
    // grab user from ctx state
    const user = ctx.state.user

    // send user to client
    ctx.status = 200
    ctx.body = {
      status: 'success',
      data: user
    }
  }

}
