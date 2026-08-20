import React, { useState } from 'react'
import styles from './LoginPage.module.css'
import { useNavigate } from 'react-router-dom'
import { Card } from '../Components/UI/Card/Card'
import { Input } from '../Components/UI/Input/Input'
import { Button } from '../Components/UI/Button/Button'
import {loginUser} from '../redux/reducers/loginSlice'
import { useDispatch , useSelector} from 'react-redux'
import type { RootState } from '../redux/store'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
   const dispatch = useDispatch<any>()

   const loading = useSelector((state: RootState) => state.login.loading)
   const error = useSelector ((state: RootState) => state.login.error)

     const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

     const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
     
   
      const login = await dispatch(loginUser({ email, password }))
      
      if (loginUser.fulfilled.match(login)){
         alert('Login successful!')
         navigate('/home')
      }
    }

  const navigateToRegister = () =>{
    navigate('/register')
  }

     


  return (
    <div className={styles.container}>
      <Card>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Log in to your ShoppingList account</p>
        <form className={styles.form} onSubmit={handleLoginSubmit}>
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

