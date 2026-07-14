import { DataTypes, Model } from 'sequelize'

import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize
} from 'sequelize'
import type { Ceiling } from './Сeiling'

export class CeilingSide extends Model<
  InferAttributes<CeilingSide>,
  InferCreationAttributes<CeilingSide>
> {
  declare id: CreationOptional<number>
  declare ceilingId: number
  declare sequenceOrder: number
  declare startX: string
  declare startY: string
  declare endX: string
  declare endY: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static associate (models: { Ceiling: typeof Ceiling }) {
    CeilingSide.belongsTo(models.Ceiling, {
      foreignKey: 'ceilingId',
      as: 'ceiling'
    })
  }

  static initModel (sequelize: Sequelize) {
    CeilingSide.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        ceilingId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          field: 'ceiling_id'
        },
        sequenceOrder: {
          allowNull: false,
          type: DataTypes.INTEGER,
          field: 'sequence_order'
        },
        startX: {
          allowNull: false,
          type: DataTypes.DECIMAL(10, 2),
          field: 'start_x'
        },
        startY: {
          allowNull: false,
          type: DataTypes.DECIMAL(10, 2),
          field: 'start_y'
        },
        endX: {
          allowNull: false,
          type: DataTypes.DECIMAL(10, 2),
          field: 'end_x'
        },
        endY: {
          allowNull: false,
          type: DataTypes.DECIMAL(10, 2),
          field: 'end_y'
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
        modelName: 'CeilingSide',
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
