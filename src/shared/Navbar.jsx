import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='sticky top-0 z-50'>
        <nav className='bg-blue-600 flex justify-center items-center gap-12 h-12 '>
            <Link className='text-xl font-bold text-white' to='/'>Home</Link>
            <Link className='text-xl font-bold text-white' to="/about">About</Link>
            <Link className='text-xl font-bold text-white' to='/login'>Login</Link>
            <Link className='text-xl font-bold text-white' to="/register">Register</Link>
        </nav>
    </div>
  )
}

export default Navbar