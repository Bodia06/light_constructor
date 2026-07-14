import { Sequelize } from 'sequelize'
import postgresConfig = require('../../config/config')

import { User } from './User'
import { Order } from './Order'
import { OrderItem } from './OrderItem'
import { Good } from './Good'
import { Ceiling } from './Сeiling'
import { CeilingSide } from './CeilingSide'

import type { Options } from 'sequelize'

const env = process.env.NODE_ENV || 'development'
const config = postgresConfig[env as keyof typeof postgresConfig]

const sequelize =
  config.use_env_variable && process.env[config.use_env_variable]
    ? new Sequelize(
        process.env[config.use_env_variable] as string,
        config as Options
      )
    : new Sequelize(
        config.database,
        config.username,
        config.password as string,
        config as Options
      )

User.initModel(sequelize)
Good.initModel(sequelize)
Order.initModel(sequelize)
OrderItem.initModel(sequelize)
Ceiling.initModel(sequelize)
CeilingSide.initModel(sequelize)

const models = {
  User,
  Good,
  Order,
  OrderItem,
  Ceiling,
  CeilingSide
}

User.associate(models)
Good.associate(models)
Order.associate(models)
OrderItem.associate(models)
Ceiling.associate(models)
CeilingSide.associate(models)

export { sequelize, User, Good, Order, OrderItem, Ceiling, CeilingSide }
