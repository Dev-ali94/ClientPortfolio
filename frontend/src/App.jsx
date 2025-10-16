import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import ProjectDetail from './pages/ProjectDetail'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
      <Route path="/project/:slug" element={<ProjectDetail />} />
      </Routes>
    </div>
  )
}

export default App
