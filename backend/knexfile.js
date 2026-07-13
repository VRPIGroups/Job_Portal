// backend/knexfile.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST || '127.0.0.1',
      database: process.env.DB_NAME || 'job_portal',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      port: process.env.DB_PORT || 5432,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};
