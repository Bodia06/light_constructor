import { DataTypes, Model } from 'sequelize'

import type {
  InferAttributes,
  Sequelize,
  CreationOptional,
  InferCreationAttributes
} from 'sequelize'
import type { OrderItem } from './OrderItem'
import type { Order } from './Order'

export class Good extends Model<
  InferAttributes<Good>,
  InferCreationAttributes<Good>
> {
  declare id: CreationOptional<number>
  declare logoSrc: string
  declare title: string
  declare description: string
  declare count: number
  declare price: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static associate (models: {
    OrderItem: typeof OrderItem
    Order: typeof Order
  }) {
    Good.hasMany(models.OrderItem, {
      foreignKey: 'goodId',
      as: 'orderItems'
    })

    Good.belongsToMany(models.Order, {
      through: models.OrderItem,
      foreignKey: 'goodId',
      otherKey: 'orderId',
      as: 'orders'
    })
  }

  static initModel (sequelize: Sequelize) {
    Good.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        logoSrc: {
          allowNull: false,
          type: DataTypes.STRING,
          field: 'logo_src'
        },
        title: {
          allowNull: false,
          type: DataTypes.STRING
        },
        description: {
          allowNull: false,
          type: DataTypes.STRING
        },
        count: {
          allowNull: false,
          type: DataTypes.INTEGER
        },
        price: {
          allowNull: false,
          type: DataTypes.DECIMAL(10, 2)
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
        modelName: 'Good',
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
