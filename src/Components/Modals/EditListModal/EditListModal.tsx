import React, { useState } from 'react'
import styles from './EditList.module.css'
import { Modal } from '../Modal'
import { Input } from '../../UI/Input/Input'
import { Button } from '../../UI/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../redux/reducers/modalSlice'
import { editListThunk } from '../../../redux/reducers/listSlice'
import type { RootState } from '../../../redux/store'
import type { AppDispatch } from '../../../redux/store'

export const EditListModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedListId = useSelector((state: RootState) => state.modal.selectedListId)
  const lists = useSelector((state: RootState) => state.list.lists)

  const currentList = lists.find(l => l.id === selectedListId)

  const [listName, setListName] = useState(currentList?.name ?? '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!listName.trim()) {
      alert('Please enter a list name')
      return
    }
    if (!currentList) return

    const result = await dispatch(editListThunk({ ...currentList, name: listName.trim() }))
    if (editListThunk.fulfilled.match(result)) {
      dispatch(closeModal())
    }
  }

  return (
    <Modal close={() => dispatch(closeModal())}>
      <h2 className={styles.title}>Edit List</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="List name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          name="listName"
        />
        <Button label="Save Changes" type="submit" />
      </form>
    </Modal>
  )
}
