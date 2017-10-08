const Router = require('koa-router')
const router = new Router()

const knex = require('../db/knex')

router.get('/auctions', async (ctx) => {
  const auctions = await knex('auctions').select()

  ctx.status = 200
  ctx.body = {
    status: 'success',
    data: auctions
  }
})

module.exports = router.routes()
