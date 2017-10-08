process.env.NODE_ENV = 'test'
const uuid = require('uuid')
const faker = require('faker')

const chai = require('chai')
const should = chai.should()

const utils = require('../../src/server/lib/utils')

describe('lib : utils', () => {

  describe('generateJWTforUser()', () => {
    xit('should create a user with token', () => {
      const user = {
        id: uuid(),
        username: 'matteo',
        email: 'matteo@email.com',
        image: faker.image.avatar(),
        bio: faker.lorem.sentences(),
        is_admin: false
      }
      const result = utils.generateJWTforUser(user)

      should.exist(result)
      result.should.be.a('object')
      result.should.have.property('id')
      result.id.should.eql(user.id)
      result.should.have.property('username')
      result.username.should.eql('matteo')
      result.should.have.property('image')
      result.image.should.eql(user.image)
      result.should.have.property('bio')
      result.bio.should.eql(user.bio)
      result.should.have.property('is_admin')
      result.is_admin.should.eql(user.is_admin)
    })
  })
})
