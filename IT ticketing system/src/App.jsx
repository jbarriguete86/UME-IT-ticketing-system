import React from 'react'
import { BrowserRouter ,Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Tickets from './pages/Tickets'
import Ticket from './components/Ticket'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="tickets" element={<Tickets/>}/>
            <Route path="tickets/:id" element={<Ticket/>}/>
          <Route path="login" element={<Login/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
