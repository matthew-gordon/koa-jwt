process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()

const localAuth = require('../../src/server/auth/local')

describe('auth : local', () => {

  describe('encodeToken()', () => {
    it('should return a token', (done) => {
      const results = localAuth.encodeToken({
        id: 'd2f1aaca-1424-43e1-b22a-5f4393210522'
      })
      should.exist(results)
      results.should.be.a('string')
      done()
    })
  })

  describe('decodeToken()', () => {
    it('should return a payload', (done) => {
      const token = localAuth.encodeToken({
        id: 'd2f1aaca-1424-43e1-b22a-5f4393210522'
      })
      should.exist(token)
      token.should.be.a('string')
      localAuth.decodeToken(token, (err, res) => {
        should.not.exist(err)
        res.sub.should.eql(
          'd2f1aaca-1424-43e1-b22a-5f4393210522'
        )
        done()
      })
    })
  })

})
