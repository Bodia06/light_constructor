import { Ceiling } from '../database/models'

import type { Attributes, CreationAttributes } from 'sequelize'

type Timetamps = 'createdAt' | 'updatedAt'

type SystemFields = 'id' | Timetamps

export type UserCeilingDTO = Omit<Attributes<Ceiling>, Timetamps>

export type CreateCeilingDTO = Omit<CreationAttributes<Ceiling>, SystemFields>

export type UpdateCeilingDTO = Partial<Omit<Attributes<Ceiling>, SystemFields>>

export type DeleteCeilingDTO = Pick<Attributes<Ceiling>, 'id'>
