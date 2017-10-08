const knex = require('../db/knex')

module.exports = async (ctx, next) => {
  const jwt = ctx.state.jwt

  if (jwt) {
    ctx.state.user = await knex('users')
      .first(
        'id',
        'email',
        'username',
        'password',
        'is_admin'
      )
      .where({id: jwt.sub})
  }

  return next()
}
