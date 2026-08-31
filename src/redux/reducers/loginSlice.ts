import { createSlice , createAsyncThunk  } from '@reduxjs/toolkit'
import type { User } from './signUpSlice'
import axios from 'axios'
import bcrypt from 'bcryptjs'

export interface AuthState {
  currentUser: User | null
  isLoggedIn: boolean
  loading: boolean
  error: string | null

}
const savedUser = localStorage.getItem('currentUser')

const initialState: AuthState = {
  currentUser: savedUser ? JSON.parse(savedUser) : null,
  isLoggedIn: false,
    loading: false,
   error: null,
 
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: Required<User>['password'] }, thunkAPI) => {
    try {

      const emailCheck = await axios.get<User[]>(
        `http://localhost:3000/users?email=${credentials.email}`
      )

      if (emailCheck.data.length === 0) {
        return thunkAPI.rejectWithValue('No account found with that email')
      }

      const user = emailCheck.data[0]

     
      const passwordMatch = await bcrypt.compare(credentials.password, user.password)
      if (!passwordMatch) {
        return thunkAPI.rejectWithValue('Wrong password, please try again')
      }

      return user
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Server error occurred during login')
    }
  }
)

export const fetchUsers = createAsyncThunk (
  'user/fetchAll',
  async  (_, thunkAPI) => {
     try {
      const response = await axios.get('http://localhost:3000/users')
      return response.data
     }
     catch (error: any){
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || 'Failed to fecth Users')
     }
  }
)

export const editUserThunk = createAsyncThunk(
  'auth/editUser',
  async (userData: User, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${userData.id}`,  userData )
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to update user')
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
       localStorage.removeItem('currentUser')
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
        localStorage.setItem('currentUser', JSON.stringify(action.payload))
    })
    .addCase(editUserThunk.fulfilled, (state, action) => {
  state.currentUser = action.payload
  localStorage.setItem('currentUser', JSON.stringify(action.payload))
    })
    .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
   }
})

export const {  logout } = loginSlice.actions
export default loginSlice.reducer
