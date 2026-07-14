const config = {
  development: {
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'admin',
    database: process.env.DB_TITLE ?? 'light',
    host: process.env.DB_HOST ?? '127.0.0.1',
    dialect: 'postgres',
    port: Number(process.env.DB_PORT) ?? 5432,
    seederStorage: 'sequelize',
    use_env_variable: null
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    use_env_variable: null
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    use_env_variable: null
  }
}

export = config
