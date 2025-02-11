import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import HomePage from './pages/HomePage.jsx'
import {Loader} from "lucide-react"
import "./app.css"
import { Toaster } from 'react-hot-toast'

function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()

  console.log(onlineUsers,"online users");
  

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({authUser},"auth user");
  
  if(isCheckingAuth && !authUser) return (
    <div>
      <Loader className='size-10 animate-spin'/>
    </div>
  )
  return (
    <div>
     <Navbar/>
     <Routes>
      <Route path='/' element={authUser ? <HomePage/>: <Navigate to="/login"/>}/>      
      <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/"/> }/>
      <Route path='/signup' element={!authUser ? <SignUpPage/>: <Navigate to="/"/>}/>
      <Route path='/settings' element={<SettingsPage/>}/>
      <Route path='/profile' element={authUser ? <ProfilePage/>: <Navigate to="/login"/>}/>
     </Routes>
     <Toaster/>
    </div>
  )
}

export default App
