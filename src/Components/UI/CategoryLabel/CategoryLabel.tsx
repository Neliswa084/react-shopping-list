import React from 'react'
import styles from './Category.module.css'

type CategoryLabelProps = {
  category: string
}

export const CategoryLabel: React.FC<CategoryLabelProps> = ({ category }) => {
  return (
    <span className={styles.label}>
      {category}
    </span>
  )
}