import React, { useState } from 'react'
import { Modal } from '../Modal'
import { closeModal } from '../../../redux/reducers/modalSlice'
import { useDispatch , useSelector } from 'react-redux'
import  type  { AppDispatch, RootState } from '../../../redux/store'
import { editUserThunk } from '../../../redux/reducers/loginSlice'
import styles from './EditProfileModal.module.css'
import { Input } from '../../UI/Input/Input'
import type { User } from '../../../redux/reducers/signUpSlice'
import { Button } from '../../UI/Button/Button'
import {  setName, setSurname, setEmail, setCellNumber } from '../../../redux/reducers/signUpSlice'



export const EditProfileModal = ({}) => {
    const dispatch = useDispatch<AppDispatch>()

  
    const editProfile= useSelector ((state: RootState) => state.login.currentUser)
    const selectedUserId = useSelector ((state: RootState) => state.modal.selectedUserId)
    const users = useSelector ((state: RootState) => state.login.currentUser)



    const [name , setName] = useState(editProfile?.name)
    const [surname , setSurname] = useState (editProfile?.surname)
    const [email , setEmail] = useState(editProfile?.email ) 
    const [cellNumber , setCellNumber] = useState(editProfile?.cellNumber)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault ()

    }

  return (

    <Modal close={() => dispatch(closeModal())}>

        <h2 className={styles['title']}> Edit Profile</h2>
         <form>
             <div className={styles.row}>
            <Input label="Name" value={name} onChange={(e) =>  setName(e.target.value)} name="name" />
            <Input label="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} name="surname" />
          </div>
          <Input label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
          <Input label="Cell number" value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} name="cellNumber" />

        
        <Button label="Edit" type="submit" />  
         
         </form>
    </Modal>
   
  )
}

