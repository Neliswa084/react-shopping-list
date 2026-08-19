import React from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { StatisticCard } from '../Components/UI/StatisticCard/StatisticCard'
import styles from './HomePage.module.css'
import { SearchBar } from '../Components/UI/SearchBar/SearchBar'

export const HomePage = () => {
  return (
    <>
      <div className={styles.container}>
     <Navbar />
     <div className={styles['statistic']}>
     <StatisticCard value={3} title='Lists' />
     <StatisticCard value={5} title='Categories' />
      <StatisticCard value={10} title='Items' />
      <StatisticCard value={4} title='Items' />
     </div>
     <SearchBar   value='value' onChange={() => {}} />
  </div>
     </>
  )
}
