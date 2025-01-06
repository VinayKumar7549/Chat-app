import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage' 
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'


const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({ authUser });

  if(isCheckingAuth  && ! authUser ) return(     // to show loading state
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={ authUser ? <HomePage /> : <LoginPage /> } />   {/*if not authenticated we will be sent to LoginPage*/}
        <Route path="/signup" element={ !authUser ? <SignUpPage /> : <HomePage /> } />
        <Route path="/login" element={ !authUser ? <LoginPage /> : <HomePage /> } />
        <Route path="/settings" element={ <SettingsPage />} />
        <Route path="/profile" element={ authUser ? <ProfilePage /> : <LoginPage /> } />
      </Routes>
    </div>
  )
}

export default App