import React from 'react'
import logo from "../assets/adminlogo.png"

const Logo = () => {
  return (
    <div className="">
    {/* Your logo content */}
    <img src={logo} alt="Logo" className=' w-[5rem] sm:w-[10rem]' />
  </div>
  )
}

export default Logo