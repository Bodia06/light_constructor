import { createSlice } from '@reduxjs/toolkit'
import {
  createUser,
  deleteUser,
  fetchUserById,
  fetchUsers,
  updateUser
} from './userThunks'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../types/userTypes'
import type { LoadingError } from '../../types/errors'

interface UserState {
  users: User[]
  selectedUser: User | null
  isLoading: boolean
  error: LoadingError | null
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
    clearSelectedUser: state => {
      state.selectedUser = null
    },
    setError: (state, action: PayloadAction<LoadingError>) => {
      state.error = action.payload
    }
  },
  extraReducers: builder => {
    builder
      // --- fetchUsers ---
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? {
          status: 'UNKNOWN',
          message: 'Failed to fetch users'
        }
      })

      // --- fetchUserById ---
      .addCase(fetchUserById.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedUser = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? {
          status: 'UNKNOWN',
          message: 'User not found'
        }
      })

      // --- createUser ---
      .addCase(createUser.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.users.push(action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? {
          status: 'UNKNOWN',
          message: 'Failed to create user'
        }
      })

      // --- updateUser ---
      .addCase(updateUser.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.users.findIndex(u => u.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? {
          status: 'UNKNOWN',
          message: 'Failed to update user'
        }
      })

      // --- deleteUser ---
      .addCase(deleteUser.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = state.users.filter(u => u.id !== action.payload)
        if (state.selectedUser?.id === action.payload) {
          state.selectedUser = null
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? {
          status: 'UNKNOWN',
          message: 'Failed to delete user'
        }
      })
  }
})

export const { clearError, clearSelectedUser, setError } = userSlice.actions
export default userSlice.reducer
