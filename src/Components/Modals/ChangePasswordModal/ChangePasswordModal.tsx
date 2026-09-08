import React, { useState } from 'react'
import { Modal } from '../Modal'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../redux/store'
import { closeModal } from '../../../redux/reducers/modalSlice'
import { editUserThunk } from '../../../redux/reducers/loginSlice'
import { Input } from '../../UI/Input/Input'
import { Button } from '../../UI/Button/Button'
import bcrypt from 'bcryptjs'
import styles from './ChangePasswordModal.module.css'

export const ChangePasswordModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: RootState) => state.login.currentUser)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!currentUser) return

    // Validate new password
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.')
      return
    }

    setLoading(true)

    // Verify current password against stored hash
    const isMatch = await bcrypt.compare(currentPassword, currentUser.password)
    if (!isMatch) {
      setError('Current password is incorrect.')
      setLoading(false)
      return
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // Save updated user
    const result = await dispatch(editUserThunk({
      ...currentUser,
      password: hashedNewPassword,
    }))

    setLoading(false)

    if (editUserThunk.fulfilled.match(result)) {
      dispatch(closeModal())
    } else {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <Modal close={() => dispatch(closeModal())}>
      <h2 className={styles.title}>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          name="currentPassword"
        />
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          name="newPassword"
        />
        <Input
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          name="confirmPassword"
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button label={loading ? 'Saving...' : 'Save Password'} type="submit" />
      </form>
    </Modal>
  )
}
