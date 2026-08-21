import React from 'react'
import styles from './RegisterPage.module.css'
import { useNavigate } from 'react-router-dom'
import { Card } from '../Components/UI/Card/Card'
import { Input } from '../Components/UI/Input/Input'
import { Button } from '../Components/UI/Button/Button'

import { useDispatch, useSelector } from 'react-redux'
import { setName, setSurname, setEmail, setPassword, setCellNumber, registerUserThunk } from '../redux/reducers/signUpSlice'
import type { RootState } from '../redux/store'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const name = useSelector((state: RootState) => state.signUp.name)
  const surname = useSelector((state: RootState) => state.signUp.surname)
  const email = useSelector((state: RootState) => state.signUp.email)
  const password = useSelector((state: RootState) => state.signUp.password)
  const cellNumber = useSelector((state: RootState) => state.signUp.cellNumber)
  
  const loading = useSelector((state: RootState) => state.signUp.loading)
  const error = useSelector((state: RootState) => state.signUp.error)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(registerUserThunk({ name, surname, email, password, cellNumber }) as any)
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
            <Input label="Name" value={name} onChange={(e) => dispatch(setName(e.target.value))} name="name" />
            <Input label="Surname" value={surname} onChange={(e) => dispatch(setSurname(e.target.value))} name="surname" />
          </div>
          <Input label="Email address" value={email} onChange={(e) => dispatch(setEmail(e.target.value))} name="email" />
          <Input label="Cell number" value={cellNumber} onChange={(e) => dispatch(setCellNumber(e.target.value))} name="cellNumber" />
          <div className={styles.row}>
            <Input label="Password" value={password} onChange={(e) => dispatch(setPassword(e.target.value))} name="password" type="password" />
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
