import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext.jsx';
import { FaLightbulb, FaMoon, FaRegLightbulb, FaSun } from 'react-icons/fa';

const ThemeButton = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className='items-center flex'>
      <div onClick={toggleTheme} className='rounded-full flex-none cursor-pointer text-2xl'>
        <div className='dark:hidden text-amber-400'><FaLightbulb/></div>
        <div className='hidden dark:block text-gray-200'><FaRegLightbulb/></div>
      </div>
    </div>
    
  )
}

export default ThemeButton