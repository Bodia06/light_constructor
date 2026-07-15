import { Ceiling } from '../database/models'

import type { Attributes, CreationAttributes } from 'sequelize'

type Timetamps = 'createdAt' | 'updatedAt'

type SystemFields = 'id' | Timetamps

export type CeilingResponseDTO = Omit<Attributes<Ceiling>, Timetamps>

export type GetCeilingByIdDTO = Pick<Attributes<Ceiling>, 'id'>

export type CreateCeilingDTO = Omit<CreationAttributes<Ceiling>, SystemFields>

export type UpdateCeilingDTO = Partial<Omit<Attributes<Ceiling>, SystemFields>>

export interface CeilingQueryParams {
  page: string
  results: string
}
