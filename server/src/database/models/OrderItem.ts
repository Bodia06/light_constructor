import { DataTypes, Model } from 'sequelize'

import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize
} from 'sequelize'
import { Order } from './Order'
import { Good } from './Good'

export class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  declare id: CreationOptional<number>
  declare orderId: number
  declare goodId: number
  declare quantity: number
  declare priceAtPurchase: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static associate (models: { Order: typeof Order; Good: typeof Good }) {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
      as: 'order'
    })

    OrderItem.belongsTo(models.Good, {
      foreignKey: 'goodId',
      as: 'good'
    })
  }

  static initModel (sequelize: Sequelize) {
    OrderItem.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        orderId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          field: 'order_id'
        },
        goodId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          field: 'good_id'
        },
        quantity: {
          allowNull: false,
          type: DataTypes.INTEGER,
          defaultValue: 1
        },
        priceAtPurchase: {
          allowNull: false,
          type: DataTypes.DECIMAL(10, 2),
          field: 'price_at_purchase'
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
        modelName: 'OrderItem',
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
