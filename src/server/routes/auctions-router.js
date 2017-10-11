const ctrl = require('../controllers').auctions
const Router = require('koa-router')
const router = new Router()

const auth = require('../middleware/auth-required-middleware')

// Custom Params
router.param('slug', ctrl.bySlug)

// GET all auctions
router.get('/auctions', ctrl.get)

// GET single auction by slug
router.get('/auctions/:slug', ctrl.getOne)

// POST create new auction
router.post('/auctions', auth, ctrl.post)

// PUT update an auction by slug
router.put('/auctions/:slug', auth, ctrl.put)

// DELETE auction by slug
router.del('/auctions/:slug', auth, ctrl.del)

module.exports = router.routes()
