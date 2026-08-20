import React, { useState } from 'react'
import styles from './RegisterPage.module.css'
import { useNavigate } from 'react-router-dom'
import { Card } from '../Components/UI/Card/Card'
import { Input } from '../Components/UI/Input/Input'
import { Button } from '../Components/UI/Button/Button'

import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../redux/reducers/signUpSlice'
import type { RootState } from '../redux/store'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const error = useSelector((state: RootState) => state.signUp.error)
  const loading = useSelector((state: RootState) => state.signUp.loading)

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    cellNumber: '',
    password: '',
    confirm: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirm) {
      alert('Passwords do not match!')
      return
    }
    const { confirm, ...userData } = formData
    const result = await dispatch(registerUserThunk(userData) as any)
    if (registerUserThunk.fulfilled.match(result)) {
      alert('Registration successful!')
      navigate('/login')
    }
  }
  return (
    <div className={styles.container}>
      <Card>
        <h2 className={styles.title}>Create account</h2>
        <p className={styles.subtitle}>Join ShoppingList and start organising</p>
        {error && <p className={styles.errorMessage} style={{ color: 'red' }}>{error}</p>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <Input label="Name" value={formData.name} onChange={handleChange} name="name" />
            <Input label="Surname" value={formData.surname} onChange={handleChange} name="surname" />
          </div>
          <Input label="Email address" value={formData.email} onChange={handleChange} name="email" />
          <Input label="Cell number" value={formData.cellNumber} onChange={handleChange} name="cellNumber" />
          <div className={styles.row}>
            <Input label="Password" value={formData.password} onChange={handleChange} name="password" type="password" />
            <Input label="Confirm" value={formData.confirm} onChange={handleChange} name="confirm" type="password" />
          </div>
          <Button label={loading ? "Creating" : "Create account"} type="submit" />
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
