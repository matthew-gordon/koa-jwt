const Router = require('koa-router')
const router = new Router()

const authHelpers = require('../auth/_helpers')
const {generateJWTforUser} = require('../lib/utils')

const auth = require('../middleware/auth-required-middleware')

// register new user
router.post('/users/register', async (ctx) => {
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
})

// login registered user
router.post('/users/login', async (ctx) => {
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
})

router.get('/auth/user', auth, async (ctx) => {
  // grab user from ctx state
  const user = ctx.state.user

  // send user to client
  ctx.status = 200
  ctx.body = {
    status: 'success',
    data: user
  }
})

module.exports = router.routes()
