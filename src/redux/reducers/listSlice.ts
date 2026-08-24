import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ShoppingItem } from './listItemSlice'
import axios from 'axios'


export interface ShoppingList {
  id?: string
  userId: string
  name: string
  items: ShoppingItem[]
  createdAt: string
}

export interface ListState  {
  lists: ShoppingList[]
  loading: boolean
  error:string | null
}

const initialState: ListState = {
lists:[],
loading:false,
error:null

}
// GET: Fetch all lists
export const fetchListsThunk = createAsyncThunk(
  'list/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3000/list')
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message || 'Failed to fetch lists')
    }
  }
)


//Create List Thunk
export const createListThunk = createAsyncThunk (
  'list/createList',
  async (listData: Omit<ShoppingList , 'id'>, thunkAPI) =>{
    try{
      const response = await axios.post('http://localhost:3000/list', listData)
      return response.data 
    }catch (err: any){
      return thunkAPI.rejectWithValue(err.message || 'Server error')
    }
  }
)
//EDIT List
export const editListThunk = createAsyncThunk(
  'list/editList',
  async (listData: ShoppingList, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:3000/list/${listData.id}`, listData)
      return response.data // Returns the updated list object
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message || 'Failed to update list')
    }
  }
)

// DELETE Remove a list
export const deleteListThunk = createAsyncThunk(
  'list/deleteList',
  async (listId: string, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3000/list/${listId}`)
      return listId 
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message || 'Failed to delete list')
    }
  }
)



export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
  

    // Item actions 
    addItem: (state, action: PayloadAction<{ listId: string; item: ShoppingItem }>) => {
      const list = state.lists.find(list => list.id === action.payload.listId)
      if (list) {
        list.items.push(action.payload.item)
      }
    },
    editItem: (state, action: PayloadAction<{ listId: string; item: ShoppingItem }>) => {
      const list = state.lists.find(list => list.id === action.payload.listId)
      if (list) {
        const index = list.items.findIndex(item => item.id === action.payload.item.id)
        if (index !== -1) {
          list.items[index] = action.payload.item
        }
      }
    },
    deleteItem: (state, action: PayloadAction<{ listId: string; itemId: string }>) => {
      const list = state.lists.find(list => list.id === action.payload.listId)
      if (list) {
        list.items = list.items.filter(item => item.id !== action.payload.itemId)
      }
    },
    toggleItem: (state, action: PayloadAction<{ listId: string; itemId: string }>) => {
      const list = state.lists.find(list => list.id === action.payload.listId)
      if (list) {
        const item = list.items.find(item => item.id === action.payload.itemId)
        if (item) {
          item.checked = !item.checked
        }
      }
    }
  },
  extraReducers: (builder) => {

  builder
    .addCase(fetchListsThunk.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchListsThunk.fulfilled, (state, action) => {
      state.loading = false
      state.lists = action.payload
    })
    .addCase(fetchListsThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

 
  builder
    .addCase(createListThunk.fulfilled, (state, action) => {
      state.lists.push(action.payload)
    })


  builder
    .addCase(editListThunk.fulfilled, (state, action) => {
      const index = state.lists.findIndex(list => list.id === action.payload.id)
      if (index !== -1) state.lists[index] = action.payload
    })


  builder
    .addCase(deleteListThunk.fulfilled, (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload)
    })
}
})

export const {  addItem, editItem, deleteItem, toggleItem } = listSlice.actions
export default listSlice.reducer
