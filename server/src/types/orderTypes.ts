import { Order } from '../database/models'

import type { Attributes, CreationAttributes } from 'sequelize'

type Timetamps = 'createdAt' | 'updatedAt'

type SystemFields = 'id' | Timetamps

export type OrderResponseDTO = Omit<Attributes<Order>, Timetamps>

export type CreateOrderDTO = Omit<CreationAttributes<Order>, SystemFields>

export type UpdateOrderDTO = Partial<Omit<Attributes<Order>, SystemFields>>

export type DeleteOrderDTO = Pick<Attributes<Order>, 'id'>
