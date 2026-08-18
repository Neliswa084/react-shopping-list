import { createSlice} from '@reduxjs/toolkit'

const ListSlice = createSlice({
    name: 'list',
    initialState:[],
    reducers: { //redux funtion or method that receives a state and an action as arguments
        getList : (state , action) => {
            return action.payload
        }

    }
})
export const { getList} = ListSlice.actions
export default ListSlice.reducer 