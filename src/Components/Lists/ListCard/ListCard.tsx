import React, { useState } from 'react'
import styles from './ListCard.module.css'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { ItemRow } from '../../Items/ItemRow/ItemRow'

export const ListCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.avatar} />
        <div className={styles.info}>
          <h3 className={styles.name}>Braai Supplies</h3>
          <p className={styles.subtitle}>2 Categories · 6 Items</p>
        </div>
        <button className={styles.arrow} onClick={() => setExpanded(!expanded)}>
          {expanded ? '▲' : '▼'}
        </button>
      </div>

      {/* Progress Bar */}
      <ProgressBar checked={2} total={6} />

      {/* Expanded content */}
      {expanded && (
        <div className={styles.expanded}>
          <p className={styles.category}>Meat</p>
          <ItemRow name="Borewors" quantity={1} unit="kg" checked={false} onCheck={() => {}} onEdit={() => {}} onDelete={() => {}} />
          <ItemRow name="Chicken" quantity={2} unit="kg" checked={false} onCheck={() => {}} onEdit={() => {}} onDelete={() => {}} />

          <p className={styles.category}>Beverages</p>
          <ItemRow name="Cold Drinks" quantity={2} unit="L" checked={false} onCheck={() => {}} onEdit={() => {}} onDelete={() => {}} />
          <ItemRow name="Juice" quantity={6} unit="" checked={false} onCheck={() => {}} onEdit={() => {}} onDelete={() => {}} />

          <div className={styles.actions}>
            <button className={styles.actionBtn}>Add Item</button>
            <button className={styles.actionBtn}>Edit</button>
            <button className={styles.actionBtn}>Share</button>
            <button className={styles.deleteBtn}>Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}
