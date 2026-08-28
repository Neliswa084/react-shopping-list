
import React, { useState } from 'react'
import styles from './AddList.module.css'
import { Modal } from '../Modal'
import { Input } from '../../UI/Input/Input'
import { Button } from '../../UI/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../redux/reducers/modalSlice'
import { createListThunk } from '../../../redux/reducers/listSlice'
import type { RootState } from '../../../redux/store'

export const LISTCATEGORIES = ['Groceries', 'Stokfel', 'Birthdays', 'Household', 'Other']

export const AddListModal: React.FC = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.login.currentUser)

  const [listName, setListName] = useState('')
  const [category, setCategory] = useState('Other')
  const [notes, setNotes] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!listName.trim()) {
      alert('Please enter a list name')
      return

    }
  


    const result = await dispatch(createListThunk({
      userId: currentUser?.id ?? '',
      name: listName,
      notes:notes,
      category:category,
      items: [],
      createdAt: new Date().toISOString()
    }) as any)
 
    if (createListThunk.fulfilled.match(result)) {
      setListName('')
      dispatch(closeModal())
    }
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

         <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <select
            className={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {LISTCATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

          <Input
          label="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          name="notes"
        />
        <Button label="Add List" type="submit" />
      </form>
    </Modal>
  )
}
