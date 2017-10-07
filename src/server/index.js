const Koa = require('koa')
const bodyParser = require('koa-body')

const app = new Koa()
const port = process.env.PORT || 3000

require('dotenv').config()

const routes = require('./routes')

app.use(bodyParser({ multipart: true }))
app.use(routes.routes())
app.use(routes.allowedMethods())

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})

module.exports = server
