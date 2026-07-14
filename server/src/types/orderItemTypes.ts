import { OrderItem } from '../database/models'

import type { Attributes, CreationAttributes } from 'sequelize'

type Timetamps = 'createdAt' | 'updatedAt'

type SystemFields = 'id' | Timetamps

export type OrderItemrResponseDTO = Omit<Attributes<OrderItem>, Timetamps>

export type CrateOrderItemDTO = Omit<
  CreationAttributes<OrderItem>,
  SystemFields
>

export type UpdateOrderItemDTO = Partial<
  Omit<Attributes<OrderItem>, SystemFields>
>

export type DeleteOrderItemDTO = Pick<Attributes<OrderItem>, 'id'>
