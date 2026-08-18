import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from './signUpSlice'

export interface AuthState {
  currentUser: User | null
  isLoggedIn: boolean
}

const initialState: AuthState = {
  currentUser: null,
  isLoggedIn: false
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.currentUser = null
      state.isLoggedIn = false
    }
  }
})

export const { login, logout } = loginSlice.actions
export default loginSlice.reducer
