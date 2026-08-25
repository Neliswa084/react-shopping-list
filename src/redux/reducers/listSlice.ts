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
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/list?userId=${userId}`)
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Failed to fetch lists')
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

// ADD Item 
export const addItemThunk = createAsyncThunk(
  'list/addItem',
  async (payload: { listId: string; item: ShoppingItem }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { list: ListState }
      const list = state.list.lists.find(l => l.id === payload.listId)
      if (!list) return thunkAPI.rejectWithValue('List not found')
      const updatedList = { ...list, items: [...list.items, payload.item] }
      const response = await axios.put(`http://localhost:3000/list/${payload.listId}`, updatedList)
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Failed to add item')
    }
  }
)

// EDIT Item 
export const editItemThunk = createAsyncThunk(
  'list/editItem',
  async (payload: { listId: string; item: ShoppingItem }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { list: ListState }
      const list = state.list.lists.find(l => l.id === payload.listId)
      if (!list) return thunkAPI.rejectWithValue('List not found')
      const updatedItems = list.items.map(i => i.id === payload.item.id ? payload.item : i)
      const updatedList = { ...list, items: updatedItems }
      const response = await axios.put(`http://localhost:3000/list/${payload.listId}`, updatedList)
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Failed to edit item')
    }
  }
)

// DELETE Item 
export const deleteItemThunk = createAsyncThunk(
  'list/deleteItem',
  async (payload: { listId: string; itemId: string }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { list: ListState }
      const list = state.list.lists.find(l => l.id === payload.listId)
      if (!list) return thunkAPI.rejectWithValue('List not found')
      const updatedList = { ...list, items: list.items.filter(i => i.id !== payload.itemId) }
      const response = await axios.put(`http://localhost:3000/list/${payload.listId}`, updatedList)
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Failed to delete item')
    }
  }
)

// TOGGLE Item checked 
export const toggleItemThunk = createAsyncThunk(
  'list/toggleItem',
  async (payload: { listId: string; itemId: string }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { list: ListState }
      const list = state.list.lists.find(l => l.id === payload.listId)
      if (!list) return thunkAPI.rejectWithValue('List not found')
      const updatedItems = list.items.map(i =>
        i.id === payload.itemId ? { ...i, checked: !i.checked } : i
      )
      const updatedList = { ...list, items: updatedItems }
      const response = await axios.put(`http://localhost:3000/list/${payload.listId}`, updatedList)
      return response.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Failed to toggle item')
    }
  }
)



export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
  
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

  // Item thunks  all return the updated list, so replace it in state
  const replaceList = (state: ListState, action: { payload: ShoppingList }) => {
    const index = state.lists.findIndex(l => l.id === action.payload.id)
    if (index !== -1) state.lists[index] = action.payload
  }

  builder.addCase(addItemThunk.fulfilled, replaceList)
  builder.addCase(editItemThunk.fulfilled, replaceList)
  builder.addCase(deleteItemThunk.fulfilled, replaceList)
  builder.addCase(toggleItemThunk.fulfilled, replaceList)
}
})

export const {  } = listSlice.actions
export default listSlice.reducer
