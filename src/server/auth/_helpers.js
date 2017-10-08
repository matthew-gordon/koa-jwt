const knex = require('../db/knex')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')

function getUser(username) {
  return knex('users')
    .where({username})
    .first()
}

function comparePass(userPassword, dbPassword) {
  const bool = bcrypt.compareSync(userPassword, dbPassword)
  if (!bool) throw new Error('Bad password')
  else return true
}

function createUser(user) {
  const {email, username, password} = user
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)

  return knex('users')
    .insert({
      id: uuid(),
      email,
      username,
      password: hash
    })
    .returning('*')
}

module.exports = {
  createUser,
  comparePass,
  getUser
}
