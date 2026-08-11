import React from 'react'
import LoginSignup from './pages/Auth/LoginSignup'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Dashboard/Home'
import Expense from './pages/Dashboard/Expense.jsx'
import Income from './pages/Dashboard/Income.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<div><LoginSignup /></div>}></Route>
      {/* ProtectedRoute */}
      <Route element={<ProtectedRoute />}>
        <Route path='/home' element={<div><Home /></div>}></Route>
        <Route path='/income' element={<div><Income /></div>}></Route>
        <Route path='/expense' element={<div><Expense /></div>}></Route>
      </Route>
      <Route path='*' element={<div>ERROR -404 - page not found</div>}></Route>
    </Routes>
  )
}

export default App