import React from 'react'

const navbar = () => {
  return (
    <nav className="header flex  justify-between items-center bg-[#6a0771] dark:bg-[#500d55]  text-white px-2 py-2 text-lg md:py-4 gap-2  md:px-8 sm:py-3 sm:px-4 ">
      <div className="webtitle flex items-center justify-center md:gap-1">
        <img src='/Favicon.svg' alt='Logo' className='w-4 h-6 mr-2 md:w-6 '></img>
        <p className='logo text-xs font-bold opacity-90 md:text-xl sm:text-sm '>J.A.R.V.I.S : The Voice Assistant</p>
      </div>
      <ul className='flex gap-3 font-medium md:gap-8 sm:gap-5'>
        <a href='https://www.google.com'  target='_blank' className='cursor-pointer hover:font-bold ,text-gray-200, text-xs md:text-lg sm:text-sm' >Home</a>
        <a href='https://www.google.com'  target='_blank' className='cursor-pointer hover:font-bold ,text-gray-200, text-xs md:text-lg sm:text-sm'>About us</a>
        <a href='https://www.google.com' target='_blank' className='cursor-pointer hover:font-bold ,text-gray-200, text-xs md:text-lg sm:text-sm'>Sign In</a>
      </ul>
    </nav>
  )
}

export default navbar
