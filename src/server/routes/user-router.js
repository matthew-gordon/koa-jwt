const Router = require('koa-router')
const router = new Router()

const localAuth = require('../auth/local')
const authHelpers = require('../auth/_helpers')

const auth = require('../middleware/auth-required-middleware')

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
    ctx.status = 500
    ctx.body = {
      status: 'error',
      err
    }
  }
})

// Login registered user
router.post('/users/login', async (ctx) => {
  const {username, password} = ctx.request.body

  try {
    // Get user from DB with helper function
    const user = await authHelpers.getUser(username)
    // Compare password to hash in DB
    const response = await authHelpers.comparePass(password, user.password)
    // Generate token for authenticated user
    const token = await localAuth.encodeToken(user)
    // Send token to client
    ctx.status = 200
    ctx.body = {
      status: 'success',
      token
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      status: 'error'
    }
  }
})

router.get('/auth/user', auth, async (ctx) => {
  const user = ctx.state.user

  ctx.status = 200
  ctx.body = {
    status: 'success',
    data: user
  }
})

module.exports = router.routes()
