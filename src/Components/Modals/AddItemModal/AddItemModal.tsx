import React, { useState, useRef } from 'react'
import styles from './AddItemModal.module.css'
import { Modal } from '../Modal'
import { Input } from '../../UI/Input/Input'
import { Button } from '../../UI/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../redux/reducers/modalSlice'
import { addItemThunk } from '../../../redux/reducers/listSlice'
import type { RootState } from '../../../redux/store'
import type { AppDispatch } from '../../../redux/store'

const CATEGORIES = ['Meat', 'Beverages', 'Dairy', 'Vegetables', 'Fruits', 'Snacks', 'Cleaning', 'Other']

export const AddItemModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedListId = useSelector((state: RootState) => state.modal.selectedListId)

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [category, setCategory] = useState('Other')
  const [notes, setNotes] = useState('')
  const [image, setImage] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    if (!selectedListId) return

    const newItem = {
      id: Date.now().toString(),
      name: name.trim(),
      quantity,
      category,
      notes: notes.trim(),
      image,
      checked: false,
      createdAt: new Date().toISOString()
    }

    const result = await dispatch(addItemThunk({ listId: selectedListId, item: newItem }))
    if (addItemThunk.fulfilled.match(result)) {
      dispatch(closeModal())
    }
  }

  return (
    <Modal close={() => dispatch(closeModal())}>
      <h2 className={styles.title}>Add Item</h2>
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

        {/* Photo upload */}
        <div className={styles.field}>
          <label className={styles.label}>Photo (optional)</label>
          <div
            className={styles.photoUpload}
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image} alt="preview" className={styles.preview} />
            ) : (
              <div className={styles.photoPlaceholder}>
                <span className={styles.photoIcon}>📷</span>
                <span className={styles.photoText}>Tap to add photo</span>
              </div>
            )}
          </div>
          {image && (
            <button
              type="button"
              className={styles.removePhoto}
              onClick={() => setImage('')}
            >
              Remove photo
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>

        <Button label="Add Item" type="submit" />
      </form>
    </Modal>
  )
}
