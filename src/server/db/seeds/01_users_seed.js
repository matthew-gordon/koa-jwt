

exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    return knex('users').insert({
      id:  'cfd94fb0-e7f6-48ac-b106-11370cfe8540',
      email: 'admin@email.com',
      username: 'admin',
      password: 'hash',
      image: 'http://image.com/image',
      bio: 'I am a bio for the admin.',
      is_admin: true
    })
  })
  .then(() => {
    return knex('users').insert({
      id: 'e6d40212-09a7-4658-928f-d8b8edf479f1',
      email: 'matt@email.com',
      username: 'matt',
      password: 'hash',
      image: 'http://image.com/image',
      bio: 'I am a bio for the matt.'
    })
  })
  .then(() => {
    return knex('users').insert({
      id: 'a3a96992-b2e7-4e2d-a9b0-fca02f19b22f',
      email: 'hannah@email.com',
      username: 'hannah',
      password: 'hash',
      image: 'http://image.com/image',
      bio: 'I am a bio for the hannah.'
    })
  })
  .then(() => {
    return knex('users').insert({
      id: 'fd0aef4a-4990-46ed-b04c-bdc16e8ff203',
      email: 'charlie@email.com',
      username: 'charlie',
      password: 'hash',
      image: 'http://image.com/image',
      bio: 'I am a bio for the charlie.'
    })
  })
  .then(() => {
    return knex('users').insert({
      id: 'b45fd4b1-544f-459d-84cd-57029a85da97',
      email: 'zeldi@email.com',
      username: 'zeldi',
      password: 'hash',
      image: 'http://image.com/image',
      bio: 'I am a bio for the zeldi.'
    })
  })
}
