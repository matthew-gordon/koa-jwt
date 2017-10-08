const bcrypt = require('bcryptjs')
const faker = require('faker')
const users = [
  {
    id: '345ae4d0-f2c3-4342-91a2-5b45cb8db57f',
    name: 'admin',
    email: 'admin@email.com',
    admin: true
  },
  {
    id: '16c1ef84-df72-4be1-ad46-1168ee53cd60',
    name: 'matt'
  },
  {
    id: 'b8d2586f-4746-418c-82b2-db9eff7a7f42',
    name: 'hannah'
  },
  {
    id: '52e1cc10-20b9-4cf2-ad94-3b0c135d35a5',
    name: 'charlie'
  },
  {
    id: '52e1cc10-20b9-4ce2-ad94-3b0c135d35a6',
    name: 'zeldi'
  }
]

function getUsers () {
  return users.map(user => {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync('password123', salt)

    return {
      id: user.id,
      email: user.email || `${user.name}@email.com`,
      username: user.name,
      password: hash,
      bio: faker.lorem.sentences(),
      image: faker.image.avatar(),
      is_admin: user.admin || false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  })
}

exports.getUsers = getUsers

exports.seed = async function (knex) {
  return knex('users').del()
    .then(() => knex('users').insert(getUsers()))
}
