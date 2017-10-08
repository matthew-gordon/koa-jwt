const faker = require('faker')
const uuid = require('uuid')
const slug = require('slug')
const {getUsers} = require('./01_users_seed')
const {subMonths} = require('date-fns')

function getAuctions(users) {
  return users.map(user => {
    return Array.from({length: 15}, () => {
      const title = faker.lorem.sentence()
      const price = faker.finance.amount(20000)
      const date = faker.date.between(subMonths(new Date(), 18), new Date())
        .toISOString()

      return {
        id: uuid(),
        artist_id: user.id,
        title,
        slug: slug(title, {lower: true}),
        description: faker.lorem.sentences(1),
        price: Number(price),
        location: faker.address.streetAddress(),
        status: faker.lorem.word(),
        created_at: date,
        updated_at: date,
      }
    })
  })
}

exports.seed = async (knex, Promise) => {
  const users = getUsers()
  // Deletes ALL existing entries
  return knex('auctions').del()
    .then(() =>
      // Inserts seed entries
      Promise.all(getAuctions(users)
        .map(auction => knex('auctions')
        .insert(auction))));
};
