const path = require('path')

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db')

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://matt:password123@localhost:5432/gh_api_test',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://matt:password123@localhost:5432/gh_api',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.joing(BASE_PATH, 'seeds')
    }
  }
}
