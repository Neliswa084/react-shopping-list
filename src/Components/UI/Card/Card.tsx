import React from 'react'
import styles from './Card.module.css'

type CardProps = {
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  )
}