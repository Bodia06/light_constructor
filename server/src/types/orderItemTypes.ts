import { OrderItem } from '../database/models'

import type { Attributes, CreationAttributes } from 'sequelize'

type Timetamps = 'createdAt' | 'updatedAt'

type SystemFields = 'id' | Timetamps

export type OrderItemrResponseDTO = Omit<Attributes<OrderItem>, Timetamps>

export type GetOrderItemByIdDTO = Pick<Attributes<OrderItem>, 'id'>

export type CrateOrderItemDTO = Omit<
  CreationAttributes<OrderItem>,
  SystemFields
>

export interface OrderItemQueryParams {
  page: string
  results: string
}
