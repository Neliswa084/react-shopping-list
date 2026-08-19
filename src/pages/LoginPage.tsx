import React, { useState } from 'react'
import styles from './LoginPage.module.css'
import { useNavigate } from 'react-router-dom'
import { Card } from '../Components/UI/Card/Card'
import { Input } from '../Components/UI/Input/Input'
import { Button } from '../Components/UI/Button/Button'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const navigateToRegister = () =>{
    navigate('/register')
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={styles.container}>
      <Card>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Log in to your ShoppingList account</p>
        <form className={styles.form}>
          <Input
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <Input
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <p className={styles.forgot}>Forgot password?</p>
          <Button label="Log in" type="submit" />
          <p className={styles.switchText}>
            Don't have an account?{' '}
            <span className={styles.link} onClick={navigateToRegister}>
              Create one
            </span>
          </p>
        </form>
      </Card>
    </div>
  )
}
