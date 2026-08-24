import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface User {
  id?: string
  name: string
  surname: string
  email: string
  password: string
  cellNumber: string
}

export interface SignUpProps extends User {
  loading: boolean
  error: string | null
}

const initialState: SignUpProps = {
  name: '',
  surname: '',
  email: '',
  password: '',
  cellNumber: '',
  loading: false,
  error: null
}

export const registerUserThunk = createAsyncThunk(
  'signUp/registerUser',
  async (userData: Omit<User, 'id'>, thunkAPI) => {
    try {
        const check = await axios.get(`http://localhost:3000/users?email=${userData.email}`)
      
      if (check.data.length > 0) {
        return thunkAPI.rejectWithValue('Email already registered')
      }

      const response = await axios.post('http://localhost:3000/users', userData)
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Server error')
    }
  }
)

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setSurname: (state, action: PayloadAction<string>) => {
      state.surname = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    setCellNumber: (state, action: PayloadAction<string>) => {
      state.cellNumber = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { setName, setSurname, setEmail, setPassword, setCellNumber } = signUpSlice.actions
export default signUpSlice.reducer
