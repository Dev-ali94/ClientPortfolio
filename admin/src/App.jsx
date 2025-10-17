import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Main from './Components/Main'

const App = () => {
  return (
    <>
      <Routes>
        {/* Public route */}
        <Route path='/login' element={
           
             <Login />
          } />

        {/* Protected route */}
        <Route 
          path='/' 
          element={
              <Main />
           
          } 
        />
      </Routes>
    </>
  )
}

export default App
