import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ModalType = 
'addList' |
 'addItem' | 
 'editList' | 
 'editItem' | 
 'deleteList' | 
 'editProfile' |
 null

export interface OpenModalState {
    isModalOpen : boolean
    modalType: ModalType
    selectedListId: string | null
    selectedUserId: string| null
}
const initialState: OpenModalState ={
    isModalOpen: false,
    modalType: null,
    selectedListId: null,
    selectedUserId: null
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers:{
    openModal: (state, action: PayloadAction<ModalType>) =>{
      state.isModalOpen = true
      state.modalType = action.payload
    },
    closeModal: (state) => {
      state.isModalOpen = false
      state.modalType = null
      state.selectedListId = null
    },
    setSelectedListId: (state, action: PayloadAction<string | null>) => {
      state.selectedListId = action.payload
    },
    selectedUserId: (state, action: PayloadAction<string | null >) => {
      state.selectedUserId = action.payload
    }

  }
})

export const {openModal, closeModal, setSelectedListId} = modalSlice.actions
export default modalSlice.reducer