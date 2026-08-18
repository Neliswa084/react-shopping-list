import {createSlice} from '@reduxjs/toolkit'

export interface ShoppingItem {
    id: string,
    name:string,
    quantity: number,
    category: string,
    image:string,
    createdAt:string
      

}