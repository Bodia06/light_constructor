import httpClient from '..'
import type {
  CreateUser,
  UpdateUser,
  User,
  UserId
} from '../../types/userTypes'

export const getUsers = async (): Promise<User[]> => {
  const {
    data: { data }
  } = await httpClient.get<{ data: User[] }>('/user')
  return data
}

export const getUserById = async (id: UserId): Promise<User> => {
  const {
    data: { data }
  } = await httpClient.get<{ data: User }>(`/user/${id}`)
  return data
}

export const createUser = async (newUser: CreateUser): Promise<User> => {
  const {
    data: { data }
  } = await httpClient.post<{ data: User }>('/user', newUser)
  return data
}

export const updateUser = async (
  id: UserId,
  updatedUser: UpdateUser
): Promise<User> => {
  const {
    data: { data }
  } = await httpClient.patch<{ data: User }>(`/user/${id}`, updatedUser)
  return data
}

export const deleteUser = async (id: UserId): Promise<void> => {
  await httpClient.delete(`/user/${id}`)
}
