const Router = require('koa-router')
const router = new Router()

// const localAuth = require('../auth/local')
const authHelpers = require('../auth/_helpers')
const {generateJWTforUser} = require('../lib/utils')

const auth = require('../middleware/auth-required-middleware')

// Register new user
router.post('/users/register', async (ctx) => {
  const user = ctx.request.body
  try {
    // Create user with helper function
    const response = await authHelpers.createUser(user)
    // Generate user with token
    const payload = generateJWTforUser(response[0])
    // Remove password from
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
      status: 'error'
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
    const payload = generateJWTforUser(user)
    // Delete password from payload
    delete payload.password
    // Send token to client
    ctx.status = 200
    ctx.body = {
      status: 'success',
      data: payload
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
