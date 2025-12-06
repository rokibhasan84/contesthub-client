import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import AllContests from './Pages/AllContests'
import ContestDetails from './Pages/ContestDetails'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-contests" element={<AllContests />} />
          <Route path="/contest/:id" element={
            <PrivateRoute>
              <ContestDetails />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* add dashboard nested routes later */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App