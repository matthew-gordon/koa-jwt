const bcrypt = require('bcryptjs')
const knex = require('../knex')

function createUser(user) {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(user.password, salt)

  return knex('users')
  .insert({
    email: user.email,
    username: user.username,
    password: hash
  })
  .returning('*')
}

module.exports = {
  createUser
}
