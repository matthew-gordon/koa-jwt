process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const knex = require('../../src/server/db/knex')
const server = require('../../src/server')

describe('routes : auctions', () => {

  beforeEach(() => knex.migrate.rollback()
       .then(() => knex.migrate.latest())
       .then(() => knex.seed.run()))

  afterEach(() => knex.migrate.rollback())

  describe('GET /api/auctions', () => {
    it('should return all auctions', (done) => {
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

})
