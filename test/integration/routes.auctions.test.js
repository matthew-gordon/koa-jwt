process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const slug = require('slug')
const faker = require('faker')

chai.use(chaiHttp)

const knex = require('../../src/server/db/knex')
const server = require('../../src/server')

describe('routes : auctions', () => {

  beforeEach(() => knex.migrate.rollback()
       .then(() => knex.migrate.latest())
       .then(() => knex.seed.run()))

  afterEach(() => knex.migrate.rollback())

  describe('GET /api/auctions', () => {
    xit('should return all auctions', (done) => {
      chai.request(server)
      .get('/api/auctions')
      .end((err, res) => {
        should.not.exist(err)
        res.redirects.length.should.eql(0)
        res.status.should.eql(200)
        res.type.should.eql('application/json')
        res.body.data[0].should.include.keys(
          'id',
          'slug',
          'title',
          'description',
          'price',
          'location',
          'watches_count',
          'winner_id',
          'artist_id',
          'status',
          'created_at',
          'updated_at'
        )
        res.body.status.should.eql('success')
        done()
      })
    })
  })

  describe('GET /api/auctions/:slug', () => {
    xit('should return single auction by slug', (done) => {
      chai.request(server)
      .get('/api/auctions/new-title')
      .end((err, res) => {
        should.not.exist(err)
        res.redirects.length.should.eql(0)
        res.status.should.eql(200)
        res.type.should.eql('application/json')
        res.body.data.should.have.property('slug')
        res.body.data.slug.should.eql('new-title')
        done()
      })
    })
  })

  describe('POST /api/auctions', () => {
    const title = 'new-title-2'
    xit('should create a new auction', (done) => {
      chai.request(server)
      .post('/api/auctions')
      .send({
        title,
        description: faker.lorem.sentences(10),
        slug: slug(title, {lower: true}),
        location: 'Denver, CO',
      })
      .end((err, res) => {
        should.not.exist(err)
        res.redirects.length.should.eql(0)
        res.status.should.eql(200)
        res.type.should.eql('application/json')
        res.body.data[0].should.include.keys(
          'id',
          'title',
          'slug',
          'description',
          'price',
          'location',
          'watches_count',
          'status',
          'winner_id',
          'artist_id',
          'created_at',
          'updated_at'
        )
        done()
      })
    })
  })

  describe('PUT /auctions/:slug', () => {
    it('should update an auction by slug', (done) => {
      chai.request(server)
      .put('/api/auctions/new-title')
      .send({
        title: 'updated title',
        description: 'updated description.',
        location: 'Aurora, CO',
        price: 17786.44
      })
      .end((err, res) => {
        should.not.exist(err)
        res.redirects.length.should.eql(0)
        res.status.should.eql(200)
        res.type.should.eql('application/json')
        res.body.status.should.eql('success')
        res.body.data[0].should.include.keys(
          'title',
          'slug',
          'description',
          'price',
          'location'
        )
        res.body.data[0].title.should.eql('updated title')
        res.body.data[0].slug.should.eql('updated-title')
        res.body.data[0].price.should.eql(17786.44)
        res.body.data[0].location.should.eql('Aurora, CO')
        done()
      })
    })
  })

})
