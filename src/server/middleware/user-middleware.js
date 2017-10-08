const knex = require('../db/knex')

module.exports = async (ctx, next) => {
  const jwt = ctx.state.jwt

  if (jwt) {
    ctx.state.user = await knex('users')
      .first(
        'id',
        'email',
        'username',
        'image',
        'bio',
        'is_admin',
        'created_at',
        'updated_at'
      )
      .where({id: jwt.sub})
  }

  return next()
}
