const Router = require('koa-router')
const router = new Router()
const api = new Router()

const users = require('./user-router')
const auctions = require('./auctions-router')

api.use(users)
api.use(auctions)

router.use('/api', api.routes())

module.exports = router
