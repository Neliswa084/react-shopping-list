import React, { useState } from 'react'
import styles from './ListCard.module.css'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { ItemRow } from '../../Items/ItemRow/ItemRow'
import type { ShoppingList } from '../../../redux/reducers/listSlice'
import { deleteListThunk, deleteItemThunk, toggleItemThunk } from '../../../redux/reducers/listSlice'
import { openModal, setSelectedListId } from '../../../redux/reducers/modalSlice'
import { setSelectedItem } from '../../../redux/reducers/listItemSlice'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../redux/store'
import type { ShoppingItem } from '../../../redux/reducers/listItemSlice'

type ListCardProps = {
  list: ShoppingList
}

export const ListCard: React.FC<ListCardProps> = ({ list }) => {
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const checkedCount = list.items.filter(item => item.checked).length

  const handleDeleteList = () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      dispatch(deleteListThunk(list.id ?? ''))
    }
  }

  const handleEditList = () => {
    dispatch(setSelectedListId(list.id ?? ''))
    dispatch(openModal('editList'))
  }

  const handleAddItem = () => {
    dispatch(setSelectedListId(list.id ?? ''))
    dispatch(openModal('addItem'))
  }

  const handleEditItem = (item: ShoppingItem) => {
    dispatch(setSelectedListId(list.id ?? ''))
    dispatch(setSelectedItem(item))
    dispatch(openModal('editItem'))
  }

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Delete this item?')) {
      dispatch(deleteItemThunk({ listId: list.id ?? '', itemId }))
    }
  }

  const handleToggleItem = (itemId: string) => {
    dispatch(toggleItemThunk({ listId: list.id ?? '', itemId }))
  }

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.avatar} />
        <div className={styles.info}>
          <h3 className={styles.name}>{list.name}</h3>
          <p className={styles.subtitle}>{new Set(list.items.map(i => i.category)).size} Categories {list.items.length} Items </p>
        </div>
        <button className={styles.arrow} onClick={() => setExpanded(!expanded)}>
          {expanded ? '▲' : '▼'}
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className={styles.expanded}>
          <ProgressBar checked={checkedCount} total={list.items.length} />

          {list.items.length === 0 && (
            <p className={styles.emptyText}>No items yet. Add one!</p>
          )}


{[...new Set(list.items.map(i => i.category))].map(category => (
  <div key={category}>
    <p className={styles.category}>{category}</p>
    {list.items
      .filter(item => item.category === category)
      .map(item => (
        <ItemRow
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          image={item.image}
          checked={item.checked}
          onCheck={() => handleToggleItem(item.id)}
          onEdit={() => handleEditItem(item)}
          onDelete={() => handleDeleteItem(item.id)}
        />
      ))
    }
  </div>
))}

          <div className={styles.actions}>
            <button className={styles.actionBtn} onClick={handleAddItem}>Add Item</button>
            <button className={styles.actionBtn} onClick={handleEditList}>Edit</button>
            <button className={styles.actionBtn}>Share</button>
            <button className={styles.deleteBtn} onClick={handleDeleteList}>Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}
