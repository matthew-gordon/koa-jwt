const knex = require('../db/knex')
const uuid = require('uuid')
const slug = require('slug')

module.exports = {

  async bySlug(slug, ctx, next) {

    if (!slug) {
      ctx.throw(404)
    }

    const auction = await knex('auctions')
      .first()
      .where({slug})

    if(!auction) {
      ctx.throw(404)
    }

    const artist = await knex('users')
      .first('username', 'bio', 'image', 'id')
      .where({id: auction.artist_id})

    auction.artist = artist

    let watched = []

    auction.watched = false

    ctx.params.auction = auction
    ctx.params.watched = watched

    await next()
  },

  async get(ctx) {
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
  },

  async getOne(ctx) {
    ctx.status = 200
    ctx.body = {
      status: 'success',
      data: ctx.params.auction
    }
  },

  async post(ctx) {
    const auction = ctx.request.body

    try {
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
    } catch (err) {
      ctx.status = 500
      ctx.body = {
        status: 'error',
        err
      }
    }
  },

  async put(ctx) {
    const slugParam = ctx.params.slug
    const {body} = ctx.request
    const auction = body

    try {
      let {price} = auction

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
    } catch (err) {
      ctx.status = 500
      ctx.body = {
        status: 'error',
        err
      }
    }
  },

  async del(ctx) {
    const {slug} = ctx.params

    try {
      const auction = await knex('auctions')
        .del()
        .where({slug})
        .returning('*')

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
  }

}
