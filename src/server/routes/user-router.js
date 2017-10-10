const ctrl = require('../controllers').users
const Router = require('koa-router')
const router = new Router()

const auth = require('../middleware/auth-required-middleware')

// POST register new user
router.post('/users/register', ctrl.post)

// POST login registered user
router.post('/users/login', ctrl.login)

// Get user
router.get('/auth/user', auth, ctrl.get)

module.exports = router.routes()
