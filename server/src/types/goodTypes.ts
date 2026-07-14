import { Good } from '../database/models'

import type { Attributes, CreationAttributes } from 'sequelize'

type Timetamps = 'createdAt' | 'updatedAt'

type SystemFields = 'id' | Timetamps

export type UserGoodDTO = Omit<Attributes<Good>, Timetamps>

export type CreateGoodDTO = Omit<CreationAttributes<Good>, SystemFields>

export type UpdateGoodDTO = Partial<Omit<Attributes<Good>, SystemFields>>

export type DeleteGoodDTO = Pick<Attributes<Good>, 'id'>
