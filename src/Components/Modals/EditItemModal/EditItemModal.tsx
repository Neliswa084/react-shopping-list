import React, { useState } from 'react'
import styles from './EditItem.module.css'
import { Modal } from '../Modal'
import { Input } from '../../UI/Input/Input'
import { Button } from '../../UI/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../redux/reducers/modalSlice'
import { editItemThunk } from '../../../redux/reducers/listSlice'
import type { RootState } from '../../../redux/store'
import type { AppDispatch } from '../../../redux/store'

const CATEGORIES = ['Meat', 'Beverages', 'Dairy', 'Vegetables', 'Fruits', 'Snacks', 'Cleaning', 'Other']

export const EditItemModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedListId = useSelector((state: RootState) => state.modal.selectedListId)
  const selectedItem = useSelector((state: RootState) => state.listItem.selectedItem)

  const [name, setName] = useState(selectedItem?.name ?? '')
  const [quantity, setQuantity] = useState(selectedItem?.quantity ?? 1)
  const [category, setCategory] = useState(selectedItem?.category ?? 'Other')
  const [notes, setNotes] = useState(selectedItem?.notes ?? '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      alert('Please enter an item name')
      return
    }
    if (!selectedItem || !selectedListId) return

    const updatedItem = {
      ...selectedItem,
      name: name.trim(),
      quantity,
      category,
      notes: notes.trim()
    }

    const result = await dispatch(editItemThunk({ listId: selectedListId, item: updatedItem }))
    if (editItemThunk.fulfilled.match(result)) {
      dispatch(closeModal())
    }
  }

  return (
    <Modal close={() => dispatch(closeModal())}>
      <h2 className={styles.title}>Edit Item</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
        <div className={styles.field}>
          <label className={styles.label}>Quantity</label>
          <input
            className={styles.numberInput}
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <select
            className={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map(cat => (
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
        <Button label="Save Changes" type="submit" />
      </form>
    </Modal>
  )
}
