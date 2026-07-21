import type { USER_ROLES } from '../../constants'

export type UserRole = typeof USER_ROLES[number]

export type UserId = number & { readonly __brand: UserId }

export interface User {
  id: UserId
  firstName: string
  lastName: string
  email: string
  phone: string
  role: UserRole
}

export interface CreateUser extends Omit<User, 'id'> {
  password: string
}

export type UpdateUser = Partial<Omit<User, 'id'>>

export interface LoginUser {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface TokenPayload {
  id: UserId
  email: string
  role?: UserRole
}

export interface UserQueryParams {
  page?: number | string
  results?: number | string
}

export interface UsersPaginatedResponse {
  data: User[]
  total: number
  page: number
  results: number
}
