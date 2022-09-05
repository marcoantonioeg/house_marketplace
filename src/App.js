import React from 'react'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Explore, ForgotPassword, Offers, Profile, SignIn, SignUp, Category, CreateListing } from './pages'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './components/PrivateRoute'
const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Explore/>}/>
        <Route path='/offers' element={<Offers/>}/>
        <Route path='/category/:categoryName' element={<Category/>}/>

          <Route path='/profile' element={<Profile/>}/>
     
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/create-listing' element={<CreateListing/>}/>

      </Routes>
      <Navbar/>
    </Router>
    <ToastContainer/>
    </>
   
  )
}

export default App