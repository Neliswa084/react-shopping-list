import { useState } from 'react'

import './App.css'
import { useSelector ,useDispatch } from 'react-redux'
import type { RootState } from './redux/store'
import { getList} from './redux/reducers/ListReducer'

function App() {

  const name = useSelector((state: RootState) => state.lists.name)
  const dispatch = useDispatch()
  dispatch(getList())


  return (
    <>
   
    <h1> Hello {name}</h1>
    </>
  )
}
 
export default App
