import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'

export const ProtectedRoute = () => {
  const currentUser = useSelector((state: RootState) => state.login.currentUser)

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}