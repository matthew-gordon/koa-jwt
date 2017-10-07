const Router = require('koa-router')
const router = new Router()

const localAuth = require('../auth/local')
const authHelpers = require('../auth/_helpers')

// Register new user
router.post(`/users/register`, async (ctx) => {
  const user = ctx.request.body

  try {
    // Create user with helper function
    const response = await authHelpers.createUser(user)
    // Generate token
    const token = await localAuth.encodeToken(response[0])
    // send token to client
    ctx.status = 200
    ctx.body = {
      status: 'success',
      token
    }
    // handle errors
  } catch (err) {
    console.log(err);
    ctx.status = 500
    ctx.body = {
      status: 'error'
    }
  }
})

module.exports = router.routes()
