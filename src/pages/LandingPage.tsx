import React from 'react'
import styles from './LandingPage.module.css'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Components/UI/Button/Button'
import shoppingListImage from '../assets/ShopingListImage-nobackground.png'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const navigateToRegister = () => navigate('/register')
  const navigateToLogin = () => navigate('/login')

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>ShoppingList</h1>
        <p className={styles.subtitle}>
          Never forget what to buy again.
        </p>
        <div className={styles.buttons}>
          <Button label="Get Started" onClick={navigateToRegister} />
          <button className={styles.loginLink} onClick={navigateToLogin}>
            Already have an account? Log in
          </button>
        </div>
      </div>
      <div className={styles.right}>
        <img src={shoppingListImage} alt="Shopping illustration" className={styles.heroImage} />
      </div>
    </div>
  )
}
