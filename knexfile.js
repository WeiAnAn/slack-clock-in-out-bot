require('dotenv').config();

module.exports = {
  test: {
    client: process.env.DB_CLIENT,
    connection: {
      database: `${process.env.DB_DATABASE}_test`,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 1,
      max: 1,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      database: `${process.env.DB_DATABASE}_dev`,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: process.env.DB_CLIENT,
    connection: {
      database: `${process.env.DB_DATABASE}_stg`,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: process.env.DB_CLIENT,
    connection: {
      database: `${process.env.DB_DATABASE}`,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
