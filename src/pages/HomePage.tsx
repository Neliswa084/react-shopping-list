
import { useEffect } from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { StatisticCard } from '../Components/UI/StatisticCard/StatisticCard'
import styles from './HomePage.module.css'
import { SearchBar } from '../Components/UI/SearchBar/SearchBar'
import { Button } from '../Components/UI/Button/Button'
import { ListCard } from '../Components/Lists/ListCard/ListCard'

import type { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../redux/reducers/modalSlice'
import { AddListModal } from '../Components/Modals/AddListModal/AddListModal'
import { AddItemModal } from '../Components/Modals/AddItemModal/AddItemModal'
import { EditListModal } from '../Components/Modals/EditListModal/EditListModal'
import { EditItemModal } from '../Components/Modals/EditItemModal/EditItemModal'
import { fetchListsThunk } from '../redux/reducers/listSlice'




export const HomePage = () => {

  const overlay = useSelector((state: RootState) => state.modal.isModalOpen)
  const modalType = useSelector((state: RootState) => state.modal.modalType)
  const lists = useSelector((state: RootState) => state.list.lists)
  const currentUser = useSelector((state: RootState) => state.login.currentUser)

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchListsThunk(currentUser.id) as any)
    }
  }, [])

  // Total items across all lists
  const totalItems = lists.reduce((total, list) => total + list.items.length, 0)

  // Total checked items across all lists
  const totalDone = lists.reduce((total, list) =>
    total + list.items.filter(item => item.checked).length, 0
  )

  // Total unique categories across all lists
  const totalCategories = new Set(
    lists.flatMap(list => list.items.map(item => item.category))
  ).size

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <div className={styles.statistic}>
            <StatisticCard value={lists.length} title='Lists' />
            <StatisticCard value={totalCategories} title='Categories' />
            <StatisticCard value={totalItems} title='Items' />
            <StatisticCard value={totalDone} title='Done' />
          </div>

          <div className={styles.searchRow}>
            <div className={styles.searchWrapper}>
              <SearchBar value='' onChange={() => { }} />
            </div>

            <button className={styles.sortBtn}>Name</button>
            <button className={styles.sortBtn}>Category</button>
            <button className={styles.sortBtn}>Date</button>
            <div className={styles.addBtn}>
              <Button label="+ Add List" onClick={() => dispatch(openModal('addList'))} />
            </div>
          </div>
          <h2 className={styles.listsTitle}>My Shopping Lists</h2>
          <div className={styles.grid}>

            {lists.length === 0 && (
              <p className={styles.noList} >No Shopping List , click Add List to Get Started </p>
            )
            }
            {[...new Set(lists.map(l => l.category))].map(category => (
              <div key={category}>
                <h3 className={styles.categoryHeading}>{category}</h3>
                <div className={styles.grid}>
                  {lists
                    .filter(list => list.category === category)
                    .map(list => (
                      <ListCard key={list.id} list={list} />
                    ))
                  }
                </div>
              </div>
            ))}


          </div>
          {overlay && modalType === 'addList' && <AddListModal />}
          {overlay && modalType === 'addItem' && <AddItemModal />}
          {overlay && modalType === 'editList' && <EditListModal />}
          {overlay && modalType === 'editItem' && <EditItemModal />}

        </div>
      </div>


    </>
  )
}
