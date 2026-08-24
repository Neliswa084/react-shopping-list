
import React, { useState } from 'react'
import styles from './AddList.module.css'
import { Modal } from '../Modal'
import { Input } from '../../UI/Input/Input'
import { Button } from '../../UI/Button/Button'
import { useDispatch, useSelector  } from 'react-redux'
import { closeModal } from '../../../redux/reducers/modalSlice'
import {createListThunk} from '../../../redux/reducers/listSlice'
import type { RootState } from '../../../redux/store'





export const AddListModal: React.FC = () => {
  const dispatch = useDispatch()
  const [listName, setListName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

        // const addList = await dispatch(createListThunk({
        //   userId,
        //   listName,
        //   items,
        //   createdAt
        // }))
    
    if (!listName.trim()) {
      alert('Please enter a list name')
      return
    }

   

    setListName('')
    dispatch(closeModal())
  }

  return (
    <Modal close={() => dispatch(closeModal())}>
      <h2 className={styles.title}>Add New List</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="List name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          name="listName"
        />
        <Button label="Add List" type="submit" />
      </form>
    </Modal>
  )
}
