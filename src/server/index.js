require('dotenv').config()

const Koa = require('koa')
const bodyParser = require('koa-body')
const logger = require('koa-logger')

const app = new Koa()
const port = process.env.PORT || 3000

const routes = require('./routes')

// middleware
const jwt = require('./middleware/jwt-middleware')
const user = require('./middleware/user-middleware')

// apply middleware
app.use(logger())
app.use(jwt)
app.use(bodyParser({ multipart: true }))
app.use(user)

// apply routes
app.use(routes.routes())
app.use(async (ctx) => {
  ctx.body = {
    message: 'Glasshouse API v1.0.1'
  }
})

// server listening
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})

module.exports = server
