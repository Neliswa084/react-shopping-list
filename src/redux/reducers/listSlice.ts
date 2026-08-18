import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ShoppingItem } from './listItemSlice'

export interface ShoppingList {
  id: string
  userId: string
  name: string
  items: ShoppingItem[]
  createdAt: string
}

export interface ListState {
  lists: ShoppingList[]
}

const initialState: ListState = {
  lists: []
}

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    // List actions
    setLists: (state, action: PayloadAction<ShoppingList[]>) => {
      state.lists = action.payload
    },
    addList: (state, action: PayloadAction<ShoppingList>) => {
      state.lists.push(action.payload)
    },
    editList: (state, action: PayloadAction<ShoppingList>) => {
      const index = state.lists.findIndex(list => list.id === action.payload.id)
      if (index !== -1) {
        state.lists[index] = action.payload
      }
    },
    deleteList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter(list => list.id !== action.payload)
    },

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
  }
})

export const { setLists, addList, editList, deleteList, addItem, editItem, deleteItem, toggleItem } = listSlice.actions
export default listSlice.reducer
