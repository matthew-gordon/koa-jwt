process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const server = require('../../src/server/index')
const knex = require('../../src/server/db/knex')

describe('routes : auth', () => {

  beforeEach(() => knex.migrate.rollback()
       .then(() => knex.migrate.latest())
       .then(() => knex.seed.run()))

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

  describe('POST /api/users/login', () => {
    it('should login a user', (done) => {
      chai.request(server)
      .post('/api/users/login')
      .send({
        username: 'matt',
        password: 'password123'
      })
      .end((err, res) => {
        should.not.exist(err)
        res.redirects.length.should.eql(0)
        res.status.should.eql(200)
        res.type.should.eql('application/json')
        res.body.status.should.eql('success')
        should.exist(res.body.token)
        done()
      })
    })
    it('should not login an unregistered user', (done) => {
      chai.request(server)
      .post('/api/users/login')
      .send({
        username: 'mitch',
        password: 'hedberg'
      })
      .end((err, res) => {
        should.exist(err)
        res.status.should.eql(500)
        res.type.should.eql('application/json')
        res.body.status.should.eql('error')
        done()
      })
    })
  })

  describe('GET /api/auth/user', () => {
    it('should return a success', (done) => {
      chai.request(server)
      .post('/api/users/login')
      .send({
        username: 'matt',
        password: 'password123'
      })
      .end((error, response) => {
        should.not.exist(error)
        chai.request(server)
        .get('/api/auth/user')
        .set('authorization', `Bearer ${response.body.token}`)
        .end((err,res) => {
          should.not.exist(err)
          res.status.should.eql(200)
          res.type.should.eql('application/json')
          res.body.status.should.eql('success')
          done()
        })
      })
    })
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/api/auth/user')
      .end((err, res) => {
        should.exist(err)
        res.status.should.eql(401)
        res.type.should.eql('text/plain')
        done()
      })
    })
  })

})
