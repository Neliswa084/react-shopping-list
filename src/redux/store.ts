import { configureStore } from '@reduxjs/toolkit'
import listReducer from './reducers/listSlice'
import listItemReducer from './reducers/listItemSlice'
import loginReducer from './reducers/loginSlice'
import signUpReducer from './reducers/signUpSlice'

const store = configureStore({
  reducer: {
    list: listReducer,
    listItem: listItemReducer,
    login: loginReducer,
    signUp: signUpReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
