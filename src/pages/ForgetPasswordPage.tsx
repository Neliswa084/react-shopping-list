import React, { useState } from 'react'
import { Button } from '../Components/UI/Button/Button'
import { Input } from '../Components/UI/Input/Input'
import { Card } from '../Components/UI/Card/Card'
import styles from './ForgotPasswordPage.module.css'


export const ForgetPasswordPage = () => {

   const [email , setEmail] = useState('')

  return (
      <div className={styles.container}>
      <Card>
        <h2 className={styles.title}>Forgot Your Password ?</h2>
        <p className={styles.subtitle}>Enter the Email you Signed Up with we will send You Reset Instructions</p>
        <form className={styles.form} >
          <Input
            label="Email address"
            value={email}
             onChange={()=> {}}
            name="email"
            type="email"
          />
          <Button label="Submit" type="submit" />
        </form>
      </Card>
    </div>
  )
}
