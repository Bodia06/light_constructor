import { Good } from '../database/models'

import type { Attributes, CreationAttributes } from 'sequelize'

type Timetamps = 'createdAt' | 'updatedAt'

type SystemFields = 'id' | Timetamps

export type GoodResponseDTO = Omit<Attributes<Good>, Timetamps>

export type GetGoodByIdDTO = Pick<Attributes<Good>, 'id'>

export type CreateGoodDTO = Omit<CreationAttributes<Good>, SystemFields>

export type UpdateGoodDTO = Partial<Omit<Attributes<Good>, SystemFields>>

export interface GoodQueryParams {
  page: string
  results: string
}
