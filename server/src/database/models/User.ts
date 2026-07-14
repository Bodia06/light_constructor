import { Model, DataTypes } from 'sequelize'
import { USER_ROLES } from '../../constants'

import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize
} from 'sequelize'
import type { userTypes } from '../../types'
import type { Order } from './Order'
import type { Ceiling } from './Сeiling'

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>
  declare firstName: string
  declare lastName: string
  declare email: string
  declare phone: string
  declare password: string
  declare role: userTypes.UserRole
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static associate (models: { Order: typeof Order; Ceiling: typeof Ceiling }) {
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders'
    })

    User.hasMany(models.Ceiling, {
      foreignKey: 'userId',
      as: 'ceilings',
      onDelete: 'CASCADE'
    })
  }

  static initModel (sequelize: Sequelize) {
    User.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        firstName: {
          allowNull: false,
          type: DataTypes.STRING,
          field: 'first_name'
        },
        lastName: {
          allowNull: false,
          type: DataTypes.STRING,
          field: 'last_name'
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true
        },
        phone: {
          allowNull: false,
          type: DataTypes.STRING
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING
        },
        role: {
          allowNull: false,
          type: DataTypes.ENUM(...USER_ROLES)
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
        modelName: 'User',
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
