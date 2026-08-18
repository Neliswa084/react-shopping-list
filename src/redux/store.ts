import { configureStore } from "@reduxjs/toolkit";
import ListReducer from  './reducers/ListReducer'

const store = configureStore({
    reducer: {
        lists: ListReducer
    }
})

export type RootState= ReturnType<typeof store.getState>  
export default store