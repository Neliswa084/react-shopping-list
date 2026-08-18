import { createSlice} from '@reduxjs/toolkit'

export interface ListState {
    name: string
}

const initialState: ListState ={
      
    name: ""
}
export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: { //redux funtion or method that receives a state and an action as arguments
        getList : (state) => {
            state.name = "neliswa"
            // state.name

           
        }

    }
})
export const { getList} = listSlice.actions
export default listSlice.reducer 