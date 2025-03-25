import React from 'react'
import '../Styles/Button.css'
import { IoIosFlash } from 'react-icons/io'


const Button = (content) => {
  return (
    <div>
      <button type="button" className='apply bg-blue-500 flex items-center text-2xl'>
        <IoIosFlash className='mr-2' /> Easy Apply
      </button>
    </div>
  )
}

export default Button