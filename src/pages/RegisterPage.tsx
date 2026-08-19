import React, { useState } from 'react'
import styles from './RegisterPage.module.css'
import { useNavigate } from 'react-router-dom'
import { Card } from '../Components/UI/Card/Card'
import { Input } from '../Components/UI/Input/Input'
import { Button } from '../Components/UI/Button/Button'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [cellNumber, setCellNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  return (
    <div className={styles.container}>
      <Card>
        <h2 className={styles.title}>Create account</h2>
        <p className={styles.subtitle}>Join ShoppingList and start organising</p>
        <form className={styles.form}>
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
          <Button label="Create account" type="submit" />
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
