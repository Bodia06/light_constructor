import { User } from '../database/models/User'
import { USER_ROLES } from '../constants'

import type { Attributes, CreationAttributes } from 'sequelize'

export type UserRole = typeof USER_ROLES[number]

type Timetamps = 'createdAt' | 'updatedAt'

type SystemFields = 'id' | Timetamps

export type UserResponseDTO = Omit<Attributes<User>, Timetamps | 'password'>

export type GetUserByIdDTO = Pick<Attributes<User>, 'id'>

export type CreateUserDTO = Omit<CreationAttributes<User>, SystemFields>

export type UpdateUserDTO = Partial<Omit<Attributes<User>, SystemFields>>

export interface UserQueryParams {
  page: string
  results: string
}
