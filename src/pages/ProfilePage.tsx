import React from 'react'
import styles from './ProfilePage.module.css'
import { Navbar } from '../Components/Navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../redux/store'
import { logout } from '../redux/reducers/loginSlice'
import { useNavigate } from 'react-router-dom'
import { openModal } from '../redux/reducers/modalSlice'
import { EditProfileModal } from '../Components/Modals/EditProfileModal/EditProfileModal'



export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const overlay = useSelector((state: RootState) => state.modal.isModalOpen)
  const modalType = useSelector((state: RootState) => state.modal.modalType)
  const currentUser = useSelector((state: RootState) => state.login.currentUser)

  const initials = currentUser
    ? `${currentUser.name[0]}${currentUser.surname[0]}`.toUpperCase()
    : 'NN'

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }



  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>

        {/* Left Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.avatar}>{initials}</div>
          <p className={styles.fullName}>
            {currentUser ? `${currentUser.name} ${currentUser.surname}` : ''}
          </p>
          <p className={styles.email}>{currentUser?.email}</p>

          <div className={styles.nav}>
            <button className={styles.navItem}>Lists</button>
            <button className={styles.navItem}>Items</button>
            <button className={styles.navItem}>Done</button>
            <button className={`${styles.navItem} ${styles.active}`}>My Profile</button>
            <button className={styles.navItem}>My lists</button>
          </div>

          <button className={styles.logout} onClick={handleLogout}>Logout</button>
        </div>

        {/* Right Content */}
        <div className={styles.main}>

          {/* Personal Details */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Personal Details</h3>
              <button className={styles.editBtn}
                onClick={() => dispatch(openModal('editProfile'))} >
                Edit
              </button>
            </div>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <p className={styles.value}>{currentUser?.name}</p>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Surname</label>
                <p className={styles.value}>{currentUser?.surname}</p>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email Address</label>
                <p className={styles.value}>{currentUser?.email}</p>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Cell Phone Number</label>
                <p className={styles.value}>{currentUser?.cellNumber}</p>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Password</h3>
              <button className={styles.editBtn}>Change</button>
            </div>
            <p className={styles.value}>{currentUser?.password}</p>
          </div>
             {overlay && modalType === 'editProfile' && <EditProfileModal />}
        </div>
      </div>
    </div>
  )
}
