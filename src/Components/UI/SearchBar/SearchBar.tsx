import React from 'react'
import styles from './SearchBar.module.css'
import searchIcon from '../../../assets/searchIcon.png'

type SearchBarProps = {
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.searchBar}>
  <img src={searchIcon} alt="search" className={styles.icon} />
  <input
    type="text"
    placeholder="Search lists..."
    value={value}
    onChange={onChange}
    className={styles.input}
  />
</div>
  )
}