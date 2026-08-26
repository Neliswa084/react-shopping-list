import React from 'react'
import styles from './LoginPage.module.css'
import { useNavigate } from 'react-router-dom'
import { Card } from '../Components/UI/Card/Card'
import { Input } from '../Components/UI/Input/Input'
import { Button } from '../Components/UI/Button/Button'
import {loginUser } from '../redux/reducers/loginSlice'
import { useDispatch , useSelector} from 'react-redux'
import type { RootState } from '../redux/store'
import { setEmail ,setPassword } from '../redux/reducers/signUpSlice'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
   const dispatch = useDispatch<any>()

  

    const email = useSelector((state: RootState) => state.signUp.email)
      const password = useSelector((state: RootState) => state.signUp.password)

     const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
     
   
      const login = await dispatch(loginUser({ email, password }))
      
      if (loginUser.fulfilled.match(login)){
         alert('Login successful!')
         navigate('/home')
      }
       if (loginUser.rejected.match(login)) {
    alert(login.payload as string || 'Invalid email or password')
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
        {/* {error && <p className={styles.errorMessage} style={{ color: 'red' }}>{error}</p>} */}
        <form className={styles.form} onSubmit={handleLoginSubmit}>
          <Input
            label="Email address"
            value={email}
             onChange={(e) => dispatch(setEmail(e.target.value))}
            name="email"
          />
          <Input
            label="Password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
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

