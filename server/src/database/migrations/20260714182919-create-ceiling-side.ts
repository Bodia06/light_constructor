import { DataTypes } from 'sequelize'

import type { QueryInterface } from 'sequelize'

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('CeilingSides', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ceiling_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ceilings',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    sequence_order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_x: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    start_y: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    end_x: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    end_y: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE
    }
  })

  await queryInterface.addIndex(
    'CeilingSides',
    ['ceiling_id', 'sequence_order'],
    {
      unique: true,
      name: 'unique_ceiling_side_order'
    }
  )
}

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('CeilingSides')
}
