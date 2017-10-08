require('dotenv').config()

const Koa = require('koa')
const bodyParser = require('koa-body')

const app = new Koa()
const port = process.env.PORT || 3000

const routes = require('./routes')

// middleware
const jwt = require('./middleware/jwt-middleware')
const userMiddleware = require('./middleware/user-middleware.js')

app.use(jwt)
app.use(bodyParser({ multipart: true }))

app.use(userMiddleware)

app.use(routes.routes())

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})

module.exports = server
