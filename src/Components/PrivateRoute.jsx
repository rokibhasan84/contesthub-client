import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="p-8">Loading...</div>

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}