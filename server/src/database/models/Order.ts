import { DataTypes, Model } from 'sequelize'

import type {
  InferAttributes,
  Sequelize,
  CreationOptional,
  InferCreationAttributes
} from 'sequelize'
import { User } from './User'
import { OrderItem } from './OrderItem'
import { Good } from './Good'

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: CreationOptional<number>
  declare userId: number
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static associate (models: {
    User: typeof User
    OrderItem: typeof OrderItem
    Good: typeof Good
  }) {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    Order.hasMany(models.OrderItem, {
      foreignKey: 'orderId',
      as: 'items',
      onDelete: 'CASCADE'
    })

    Order.belongsToMany(models.Good, {
      through: models.OrderItem,
      foreignKey: 'orderId',
      otherKey: 'goodId',
      as: 'goods'
    })
  }

  static initModel (sequelize: Sequelize) {
    Order.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        userId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          field: 'user_id'
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          field: 'created_at'
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          field: 'updated_at'
        }
      },
      {
        sequelize,
        modelName: 'Order',
        underscored: true,
        defaultScope: {
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      }
    )
  }
}
