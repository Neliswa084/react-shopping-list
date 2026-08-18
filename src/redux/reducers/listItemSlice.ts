import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ShoppingItem {
  id: string
  name: string
  quantity: number
  notes?: string
  category: string
  image?: string
  checked: boolean
  createdAt: string
}

export interface ListItemState {
  selectedItem: ShoppingItem | null
}

const initialState: ListItemState = {
  selectedItem: null
}

export const listItemSlice = createSlice({
  name: 'listItem',
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<ShoppingItem | null>) => {
      state.selectedItem = action.payload
    }
  }
})

export const { setSelectedItem } = listItemSlice.actions
export default listItemSlice.reducer
