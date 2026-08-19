import React from 'react'
import styles from './StatisticCard.module.css'

type StatisticCardProps = {
  title: string
  value: number
}

export const StatisticCard: React.FC<StatisticCardProps> = ({ title, value }) => {
  return (
    <div className={styles.card}>
      <span className={styles.value}>{value}</span>
      <span className={styles.title}>{title}</span>
    </div>
  )
}