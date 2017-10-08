const Router = require('koa-router')
const router = new Router()

const knex = require('../db/knex')

router.get('/auctions', async (ctx) => {
  try {
    const auctions = await knex('auctions').select()

    ctx.status = 200
    ctx.body = {
      status: 'success',
      data: auctions
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      status: 'error',
      err
    }
  }
})

router.get('/auctions/:slug', async (ctx) => {
  const {slug} = ctx.params

  try {
    const auction = await knex('auctions')
    .first()
    .where({slug})

    ctx.status = 200
    ctx.body = {
      status: 'success',
      data: auction
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      status: 'error',
      err
    }
  }
})

module.exports = router.routes()
