import React, {useEffect}from 'react'
import { BrowserRouter ,Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Tickets from './pages/Tickets'
import Ticket from './components/Ticket'
import AuthRequired from './components/AuthRequired'

function App() {

  useEffect(()=>{
    console.log("app re-rendered")
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route element={<AuthRequired />}>
            <Route path="tickets" element={<Tickets/>}/>
              <Route path="tickets/:id" element={<Ticket/>}/>
              </Route>
            <Route path="login" element={<Login/>}/>
          
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
