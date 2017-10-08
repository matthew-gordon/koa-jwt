const Router = require('koa-router')
const router = new Router()

const knex = require('../db/knex')
const uuid = require('uuid')

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

router.post('/auctions', async (ctx) => {
  const auction = ctx.request.body

  auction.id = uuid()

  const newAuction = await knex('auctions')
    .insert(auction)
    .returning('*')

  ctx.status = 200
  ctx.body = {
    status: 'success',
    data: newAuction
  }
})

module.exports = router.routes()
