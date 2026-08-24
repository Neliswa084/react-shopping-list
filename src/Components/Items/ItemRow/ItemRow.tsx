import React from 'react'
import styles from './ItemRow.module.css'

type ItemRowProps = {
  name: string
  quantity: number
  // unit: string
  image?: string
  checked: boolean
  onCheck: () => void
  onEdit: () => void
  onDelete: () => void
}

export const ItemRow: React.FC<ItemRowProps> = ({ name, quantity, image,checked, onCheck, onEdit,onDelete}) => {
  return (
    <div className={styles.row}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onCheck}
        className={styles.checkbox}
      />
      {image ? (
        <img src={image} alt={name} className={styles.image} />
      ) : (
        <div className={styles.imagePlaceholder} />
      )}
      <span className={`${styles.name} ${checked ? styles.checked : ''}`}>
        {name}
      </span>
      <span className={styles.quantity}>X {quantity}</span>
      <button className={styles.editBtn} onClick={onEdit}>Edit</button>
      <button className={styles.deleteBtn} onClick={onDelete}>Delete</button>
    </div>
  )
}
