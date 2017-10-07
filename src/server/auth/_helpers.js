const knex = require('../db/knex')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const localAuth = require('./local')

function getUser(username) {
  return knex('users').where({username}).first()
}

function comparePass(userPassword, dbPassword) {
  const bool = bcrypt.compareSync(userPassword, dbPassword)
  if (!bool) throw new Error('Bad password')
  else return true
}

function createUser(user) {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(user.password, salt)

  return knex('users')
    .insert({
      id: uuid(),
      email: user.email,
      username: user.username,
      password: hash
    })
    .returning('*')
}

function ensureAuthenticated(ctx, next) {
  // Check if token is in request
  const req = ctx.request.headers

  if (!(req && req.authorization)) {
    ctx.status = 400
    ctx.body = {
      status: 'Please login'
    }
  } else {
    try {
      let headers = req.authorization.split(' ')
      let token = headers[1]

      localAuth.decodeToken(token, (err, payload) => {
        if (err) {
          ctx.status = 401
          ctx.body = {
            status: 'Token has expired.'
          }
        }
        // check if user still exists in DB
        const user = knex('users').where({id: parseInt(payload.sub)}).first()
        if (user) {
          next()
        }
      })
    } catch (err) {
      ctx.status = 500
      ctx.body = {
        status: 'error'
      }
    }
  }
}

module.exports = {
  createUser,
  comparePass,
  getUser,
  ensureAuthenticated
}
