import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Main from './Components/Main'
import ProtectedRoute from './Components/ProtectedRoute'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Main /></ProtectedRoute>} />    
        <Route path='/login' element={<Login />} />
      </Routes >

    </>
  )
}

export default App
