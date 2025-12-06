import React, { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import axios from '../api/axiosInstance'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ... other fields if you have
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const GoogleProvider = new GoogleAuthProvider()

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      setLoading(false)
      // Obtain JWT from your server (exchange Firebase uid/email for server token)
      if (currentUser) {
        try {
          const tokenResp = await axios.post('/jwt', { email: currentUser.email })
          localStorage.setItem('accessToken', tokenResp.data.token)
        } catch (err) {
          console.error('JWT fetch error', err)
        }
      } else {
        localStorage.removeItem('accessToken')
      }
    })
    return () => unsub()
  }, [])

  const value = {
    user,
    loading,
    register: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    login: (email, password) => signInWithEmailAndPassword(auth, email, password),
    loginWithGoogle: () => signInWithPopup(auth, GoogleProvider),
    logout: () => signOut(auth)
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}