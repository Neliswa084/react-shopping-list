import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id?: string
  name: string
  surname: string
  email: string
  password: string
  cellNumber: string
}

export interface SignUpState {
  users: User[]
  loading: boolean
  error: string | null
}

const initialState: SignUpState = {
  users: [],
  loading: false,
  error:  null
}

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
     
    registerStart: (state) => {
      state.loading = true
      state.error = null
    },
    registerUser: (state, action: PayloadAction<User>) => {
      state.loading=false
      state.users.push(action.payload)
    },
     registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { registerStart, registerUser ,registerFailure} = signUpSlice.actions
export default signUpSlice.reducer
