import { createAsyncThunk } from '@reduxjs/toolkit'
import * as userApi from '../../api/restApi/restApi'
import { normalizeError } from '../../utils/normalizeError'

import type {
  CreateUser,
  UpdateUser,
  User,
  UserId
} from '../../types/userTypes'
import type { LoadingError } from '../../types/errors'

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: LoadingError }
>('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    return await userApi.getUsers()
  } catch (error) {
    return rejectWithValue(normalizeError(error))
  }
})

export const fetchUserById = createAsyncThunk<
  User,
  UserId,
  { rejectValue: LoadingError }
>('users/fetchUserById', async (id, { rejectWithValue }) => {
  try {
    return await userApi.getUserById(id)
  } catch (error) {
    return rejectWithValue(normalizeError(error))
  }
})

export const createUser = createAsyncThunk<
  User,
  CreateUser,
  { rejectValue: LoadingError }
>('users/createUser', async (newUser, { rejectWithValue }) => {
  try {
    return await userApi.createUser(newUser)
  } catch (error) {
    return rejectWithValue(normalizeError(error))
  }
})

export const updateUser = createAsyncThunk<
  User,
  { id: UserId; updatedUser: UpdateUser },
  { rejectValue: LoadingError }
>('users/updateUser', async ({ id, updatedUser }, { rejectWithValue }) => {
  try {
    return await userApi.updateUser(id, updatedUser)
  } catch (error) {
    return rejectWithValue(normalizeError(error))
  }
})

export const deleteUser = createAsyncThunk<
  UserId,
  UserId,
  { rejectValue: LoadingError }
>('users/deleteUser', async (id, { rejectWithValue }) => {
  try {
    await userApi.deleteUser(id)
    return id
  } catch (error) {
    return rejectWithValue(normalizeError(error))
  }
})
