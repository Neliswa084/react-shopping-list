import { useEffect, useState } from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { StatisticCard } from '../Components/UI/StatisticCard/StatisticCard'
import styles from './HomePage.module.css'
import { SearchBar } from '../Components/UI/SearchBar/SearchBar'
import { Button } from '../Components/UI/Button/Button'
import { ListCard } from '../Components/Lists/ListCard/ListCard'

import type { RootState } from '../redux/store'
import type { AppDispatch } from '../redux/store'
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
  const dispatch = useDispatch<AppDispatch>()

  const [sortBy, setSortBy] = useState<'name' | 'category' | 'date'>('date')
  const [searchQuery, setSearchQuery] = useState('')

  // Option A: track which category is open. null = show category cards
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchListsThunk(currentUser.id))
    }
  }, [])

  const totalItems = lists.reduce((total, list) => total + list.items.length, 0)
  const totalDone = lists.reduce((total, list) =>
    total + list.items.filter(item => item.checked).length, 0
  )
  const totalCategories = new Set(lists.map(list => list.category)).size

  // All categories from the user's lists
  const allCategories = [...new Set(lists.map(l => l.category))]

  // Search + sort — used when inside a category
  const filteredLists = lists
    .filter(list => list.category === selectedCategory)
    .filter(list =>
      list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.notes.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const sortedLists = [...filteredLists].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    return 0
  })

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>

          {/* Stats — always visible */}
          <div className={styles.statistic}>
            <StatisticCard value={lists.length} title='Lists' />
            <StatisticCard value={totalCategories} title='Categories' />
            <StatisticCard value={totalItems} title='Items' />
            <StatisticCard value={totalDone} title='Done' />
          </div>

          {/* ── LEVEL 1: Category cards ── */}
          {selectedCategory === null && (
            <>
              <div className={styles.pageHeader}>
                <h2 className={styles.listsTitle}>My Shopping Lists</h2>
                <Button label="+ Add List" onClick={() => dispatch(openModal('addList'))} />
              </div>

              {/* Search to filter category cards */}
              <div className={styles.searchRow}>
                <div className={styles.searchWrapper}>
                  <SearchBar
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {lists.length === 0 && (
                <p className={styles.noList}>No shopping lists yet. Click Add List to get started!</p>
              )}

              <div className={styles.categoryCardGrid}>
                {allCategories
                  .filter(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(category => {
                  const catLists = lists.filter(l => l.category === category)
                  const catItems = catLists.reduce((t, l) => t + l.items.length, 0)
                  const catDone = catLists.reduce((t, l) => t + l.items.filter(i => i.checked).length, 0)
                  return (
                    <div
                      key={category}
                      className={styles.categoryCard}
                      onClick={() => {
                        setSelectedCategory(category)
                        setSearchQuery('')
                      }}
                    >
                      <div className={styles.categoryCardLeft}>
                        <h3 className={styles.categoryCardName}>{category}</h3>
                        <p className={styles.categoryCardMeta}>
                          {catLists.length} {catLists.length === 1 ? 'list' : 'lists'} · {catItems} items
                        </p>
                      </div>
                      <div className={styles.categoryCardRight}>
                        {catItems > 0 && (
                          <span className={styles.doneTag}>{catDone}/{catItems} done</span>
                        )}
                        <span className={styles.chevron}>›</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* ── LEVEL 2: Lists inside a category ── */}
          {selectedCategory !== null && (
            <>
              {/* Back + title */}
              <div className={styles.drillHeader}>
                <button className={styles.backBtn} onClick={() => {
                  setSelectedCategory(null)
                  setSearchQuery('')
                }}>
                  ← Back
                </button>
                <h2 className={styles.listsTitle}>{selectedCategory}</h2>
              </div>

              {/* Search + sort + add */}
              <div className={styles.searchRow}>
                <div className={styles.searchWrapper}>
                  <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <button
                  className={`${styles.sortBtn} ${sortBy === 'name' ? styles.sortActive : ''}`}
                  onClick={() => setSortBy('name')}>Name</button>
                <button
                  className={`${styles.sortBtn} ${sortBy === 'date' ? styles.sortActive : ''}`}
                  onClick={() => setSortBy('date')}>Date</button>
                <div className={styles.addBtn}>
                  <Button label="+ Add List" onClick={() => dispatch(openModal('addList'))} />
                </div>
              </div>

              {/* List cards */}
              <div className={styles.grid}>
                {sortedLists.length === 0 && (
                  <p className={styles.noList}>No lists found.</p>
                )}
                {sortedLists.map(list => (
                  <ListCard key={list.id} list={list} />
                ))}
              </div>
            </>
          )}

          {/* Modals */}
          {overlay && modalType === 'addList' && <AddListModal />}
          {overlay && modalType === 'addItem' && <AddItemModal />}
          {overlay && modalType === 'editList' && <EditListModal />}
          {overlay && modalType === 'editItem' && <EditItemModal />}

        </div>
      </div>
    </>
  )
}
