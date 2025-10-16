import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Main from './Components/Main'
import PrivateRoute from './Components/PrivateRoute'   // ✅ Import the guard

const App = () => {
  return (
    <>
      <Routes>
        {/* Public route */}
        <Route path='/login' element={<Login />} />

        {/* Protected route */}
        <Route 
          path='/' 
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          } 
        />
      </Routes>
    </>
  )
}

export default App
