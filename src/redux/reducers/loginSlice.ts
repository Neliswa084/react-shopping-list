import { createSlice , createAsyncThunk  } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from './signUpSlice'
import axios from 'axios'

export interface AuthState {
  currentUser: User | null
  isLoggedIn: boolean
  loading: boolean
  error: string | null

}

const initialState: AuthState = {
  currentUser: null,
  isLoggedIn: false,
    loading: false,
   error: null,
 
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: Required<User>['password'] }, thunkAPI) => {
    try {
      // Use query filters: /users?email=X&password=Y
      const response = await axios.get<User[]>(
        `http://localhost:3000/users?email=${credentials.email}&password=${credentials.password}`
      )

      // JSON Server returns an array of matching results
      if (response.data.length === 0) {
        // No user matched the email and password combination
        return thunkAPI.rejectWithValue('Invalid email or password')
      }

      // User found! Return the first matching user object
      return response.data[0]
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Server error occurred during login')
    }
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // login: (state, action: PayloadAction<User>) => {
    //   state.currentUser = action.payload
    //   state.isLoggedIn = true
    // },
    logout: (state) => {
      state.currentUser = null
      state.isLoggedIn = false
      state.error = null
    },
  },
   extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
      state.error= null
    })
    .addCase(loginUser.fulfilled,(state, action) =>{
     state.loading = false
        state.currentUser = action.payload
        state.isLoggedIn = true
    })
    .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
   }
})

export const {  logout } = loginSlice.actions
export default loginSlice.reducer
