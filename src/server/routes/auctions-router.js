const Router = require('koa-router')
const router = new Router()

const knex = require('../db/knex')
const uuid = require('uuid')
const slug = require('slug')

// GET all auctions
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

// GET single auction by slug
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

// POST create new auction
router.post('/auctions', async (ctx) => {
  const auction = ctx.request.body
  const {title} = auction

  auction.id = uuid()
  auction.slug = slug(title, {lower: true})

  const newAuction = await knex('auctions')
    .insert(auction)
    .returning('*')

  ctx.status = 200
  ctx.body = {
    status: 'success',
    data: newAuction
  }
})

// PUT update an auction by slug
router.put('/auctions/:slug', async (ctx) => {
  const slugParam = ctx.params.slug
  const {body} = ctx.request
  const auction = body
  const {price} = auction

  auction.price = Number(price)
  auction.slug = slug(auction.title, {lower:true})

  const updatedAuction = await knex('auctions')
    .update(auction)
    .where({slug: slugParam})
    .returning('*')

  ctx.status = 200
  ctx.body = {
    status: 'success',
    data: updatedAuction
  }
})

// DELETE auction by slug
router.del('/auctions/:slug', async (ctx) => {
  const {slug} = ctx.params
  const auction = await knex('auctions')
    .del()
    .where({slug})
    .returning('*')

  ctx.status = 200
  ctx.body = {
    status: 'success',
    data: auction
  }
})

module.exports = router.routes()
