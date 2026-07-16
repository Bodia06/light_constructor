import { Order } from '../database/models'

import type { Attributes, CreationAttributes } from 'sequelize'

type Timetamps = 'createdAt' | 'updatedAt'

type SystemFields = 'id' | Timetamps

export type OrderResponseDTO = Omit<Attributes<Order>, Timetamps>

export type GetOrderByIdDTO = Pick<Attributes<Order>, 'id'>

export type CreateOrderDTO = Omit<CreationAttributes<Order>, SystemFields>

export interface OrderQueryParams {
  page: string
  results: string
}
