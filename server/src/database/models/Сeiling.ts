import { DataTypes, Model } from 'sequelize'

import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize
} from 'sequelize'

import type { User } from './User'
import type { CeilingSide } from './CeilingSide'

export class Ceiling extends Model<
  InferAttributes<Ceiling>,
  InferCreationAttributes<Ceiling>
> {
  declare id: CreationOptional<number>
  declare userId: number
  declare title: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static associate (models: {
    CeilingSide: typeof CeilingSide
    User: typeof User
  }) {
    Ceiling.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    Ceiling.hasMany(models.CeilingSide, {
      foreignKey: 'ceilingId',
      as: 'sides',
      onDelete: 'CASCADE'
    })
  }

  static initModel (sequelize: Sequelize) {
    Ceiling.init(
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
        title: {
          allowNull: false,
          type: DataTypes.STRING
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
        modelName: 'Ceiling',
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
