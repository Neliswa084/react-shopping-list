import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

export const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoText}>ShoppingList</span>
      </div>
      <div className={styles.links}>
        <Link to="/home" className={styles.link}>Home</Link>
        <Link to="/profile" className={styles.link}>Profile</Link>
      </div>
    </nav>
  )
}