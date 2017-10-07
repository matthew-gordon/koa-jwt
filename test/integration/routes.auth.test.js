process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../../src/server/index')
const knex = require('../../src/server/db/knex')

describe('routes : auth', () => {

  beforeEach(() =>
    knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
  )

  afterEach(() => knex.migrate.rollback())

  describe('POST /api/users/register', () => {
    it('should register a new user', (done) => {
      chai.request(server)
      .post('/api/users/register')
      .send({
        email: 'moo@email.com',
        username: 'matthew',
        password: 'gordon'
      })
      .end((err, res) => {
        console.log(err);
        should.not.exist(err)
        res.redirects.length.should.eql(0)
        res.status.should.eql(200)
        res.type.should.eql('application/json')
        res.body.should.include.keys('status', 'token')
        res.body.status.should.eql('success')
        done()
      })
    })
  })

})
