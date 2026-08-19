import React, { useState } from 'react'
import styles from './RegisterPage.module.css'
import { useNavigate } from 'react-router-dom'
import { Card } from '../Components/UI/Card/Card'
import { Input } from '../Components/UI/Input/Input'
import { Button } from '../Components/UI/Button/Button'

import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import {registerStart, registerUser ,registerFailure} from '../redux/reducers/signUpSlice'
import type { RootState } from '../redux/store'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const  error = useSelector((state:RootState) => state.signUp.error)
  const loading = useSelector((state:RootState) => state.signUp.loading )


  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [cellNumber, setCellNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

      if (password !== confirm) {
      dispatch(registerFailure("Passwords do not match!"))
      return
    }
        const newUser = { name, surname, email, cellNumber, password }

    try {
      // 1. Alert Redux that the network request is beginning
      dispatch(registerStart())

      // 2. Run the asynchronous POST request to your JSON server
      const response = await axios.post('http://localhost:3000/users', newUser)

      // 3. Server sends back the saved user containing their new unique ID
      dispatch(registerUser(response.data))

      alert('Registration successful!')
      navigate('/login') // Redirect the user to login page
    } catch (err: any) {
      // 4. Capture any network or backend crashes
      dispatch(registerFailure(err.message || 'Server error occurred.'))
    }
  
   }
  return (
    <div className={styles.container}>
      <Card>
        <h2 className={styles.title}>Create account</h2>
        <p className={styles.subtitle}>Join ShoppingList and start organising</p>
         {error && <p className={styles.errorMessage} style={{ color: 'red' }}>{error}</p>}
        <form className={styles.form}  onSubmit={handleSubmit}>
          <div className={styles.row}>
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} name="name" />
            <Input label="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} name="surname" />
          </div>
          <Input label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
          <Input label="Cell number" value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} name="cellNumber" />
          <div className={styles.row}>
            <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
            <Input label="Confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} name="confirm" />
          </div>
          <Button label= {loading ? "Creating": "Create account"} type="submit" />
          <p className={styles.switchText}>
            Already have an account?{' '}
            <span className={styles.link} onClick={() => navigate('/login')}>
              Log in
            </span>
          </p>
        </form>
      </Card>
    </div>
  )
}
