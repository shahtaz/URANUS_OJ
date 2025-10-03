import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Header = () => {
  const { userData, isLoggedin } = useContext(AppContent)
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (isLoggedin) {
      navigate('/user/problems') // redirect to problem set page
    } else {
      toast.info('Please login first') // notify user
    }
  }

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img src={assets.header_img} alt="" className='w-60 h-60 rounded-full mb-6'/>
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
        Hey, {userData ? userData.name : 'Coder'}!
      </h1>

      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>
        Welcome to Uranus Online Judge
      </h2>
      <p className='mb-8 max-w-md'>
        Sharpen your problem-solving skills, challenge yourself with diverse programming problems, and rise through the ranks.
        Whether you’re a beginner or a seasoned coder, Uranus OJ is here to be your launchpad to the stars of competitive programming.
      </p>

      <button
        className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'
        onClick={handleGetStarted}
      >
        Get Started
      </button>
    </div>
  )
}

export default Header
