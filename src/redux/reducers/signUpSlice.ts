import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string
  name: string
  surname: string
  email: string
  password: string
  cellNumber: string
}

export interface SignUpState {
  users: User[]
}

const initialState: SignUpState = {
  users: []
}

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    }
  }
})

export const { registerUser } = signUpSlice.actions
export default signUpSlice.reducer
