import React from 'react'
import styles from './ProgressBar.module.css'

type ProgressBarProps = {
  total: number
  checked: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, checked }) => {
  const percentage = total === 0 ? 0 : Math.round((checked / total) * 100)

  return (
    <div className={styles.container}>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percentage}%` }} />
      </div>
      <span className={styles.text}>{checked}/{total} items</span>
    </div>
  )
}