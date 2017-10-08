exports.up = function(knex, Promise) {
  return knex.schema

  .createTable('users', (table) => {
    table.uuid('id').primary().unique().notNullable()
    table.text('email').unique().notNullable()
    table.text('username').unique().notNullable()
    table.text('password').notNullable()
    table.text('image')
    table.text('bio')
    table.boolean('is_admin').defaultTo(false)
    table.timestamps(true, true)
  })

  .createTable('auctions', (table) => {
    table.uuid('id').primary().unique().notNullable()
    table.text('slug').unique().notNullable()
    table.text('title').notNullable()
    table.text('description').notNullable()
    table.decimal('price', 8, 2).defaultTo(0.00)
    table.string('location').notNullable()
    table.integer('watches_count').defaultTo(0)
    table.uuid('winner_id').defaultTo(null).references('users.id')
      .onDelete('CASCADE')
    table.uuid('artist_id').defaultTo(null).references('users.id')
      .onDelete('CASCADE')
    table.string('status').defaultTo(null)
    table.timestamps(true, true)
  })

}

exports.down = function(knex, Promise) {
  return knex.schema
    .raw('DROP TABLE IF EXISTS users CASCADE;')
    .raw('DROP TABLE IF EXISTS auctions CASCADE;')
}
