import React, { useContext } from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
// import { Result } from 'postcss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'


const App = () => {
  const { showLogin } = useContext(AppContext)
  return (
    // bg-gradient-to-b from-teal-50 to-orange-50 for color in screen 50/50
    // <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen 	bg-gradient-to-b from-teal-50 to-orange-50'>


    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen 	bg-gradient-to-b from-orange-400 to-red-500'>


      <ToastContainer position='bottom-right' />
      <Navbar />
      {showLogin && <Login />}
      {/* <Login></Login> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCredit />} />
        {/* <Route path='/login' element={<Login />} /> */}


      </Routes>
      <Footer />
    </div>
  )
}

export default App