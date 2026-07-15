import { CeilingSide } from '../database/models'

import type { Attributes, CreationAttributes } from 'sequelize'

type Timetamps = 'createdAt' | 'updatedAt'

type SystemFields = 'id' | Timetamps

export type CeilingSideResponseDTO = Omit<Attributes<CeilingSide>, Timetamps>

export type GetCeilingSideByIdDTO = Pick<Attributes<CeilingSide>, 'id'>

export type CreateCeilingSideDTO = Omit<
  CreationAttributes<CeilingSide>,
  SystemFields
>

export type UpdateCeilingSideDTO = Partial<
  Omit<Attributes<CeilingSide>, SystemFields>
>

export interface CeilingSideQueryParams {
  page: string
  results: string
}
