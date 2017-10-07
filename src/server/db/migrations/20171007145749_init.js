exports.up = function(knex, Promise) {
  return knex.schema

  .createTable('users', (table) => {
    table.uuid('id').primary().unique().notNullable()
    table.text('email').unique().notNullable()
    table.text('username').unique().notNullable()
    table.text('password').notNullable()
    table.boolean('is_admin').defaultTo(false)
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema
    .raw('DROP TABLE IF EXISTS users CASCADE;')
}
