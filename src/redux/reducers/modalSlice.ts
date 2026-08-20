import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ModalType = 
'addList' |
 'addItem' | 
 'editList' | 
 'editItem' | 
 'deleteList' | 
 null

export interface OpenModalState {
    isModalOpen : boolean
    modalType: ModalType
}
const initialState: OpenModalState ={
    isModalOpen: false,
     modalType: null
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
  }
  } 
})

export const {openModal,closeModal} = modalSlice.actions
export default modalSlice.reducer