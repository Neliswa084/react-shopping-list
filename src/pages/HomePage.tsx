import React from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { StatisticCard } from '../Components/UI/StatisticCard/StatisticCard'
import styles from './HomePage.module.css'
import { SearchBar } from '../Components/UI/SearchBar/SearchBar'
import { Button } from '../Components/UI/Button/Button'

export const HomePage = () => {
  return (
    <>
      <div className={styles.container}>
           <Navbar />
        <div className={styles.content}>
  
     <div className={styles.statistic}>
     <StatisticCard value={3} title='Lists' />
     <StatisticCard value={5} title='Categories' />
      <StatisticCard value={10} title='Items' />
      <StatisticCard value={4} title='Done' />
     </div>

    <div className={styles.searchRow}>
  <div className={styles.searchWrapper}>
     <SearchBar value='' onChange={() => {}} />
      </div>

      <button className={styles.sortBtn}>Name</button>
  <button className={styles.sortBtn}>Category</button>
  <button className={styles.sortBtn}>Date</button>
  <div className={styles.addBtn}>
    <Button label="+ Add List" onClick={() => {}} />
  </div>
  </div>
<h2 className={styles.listsTitle}>My Shopping Lists</h2>
<div className={styles.grid}>
  
</div>
  
</div>
  </div>


     </>
  )
}
