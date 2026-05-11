import React from 'react'
import { ToastContainer, toast } from 'react-toastify';


const Navbar = () => {


  return (
    <>
    <nav className= 'bg-slate-800 flex items-center justify-around'>
    <div className='text-2xl text-white font-bold'>
        <span className=' text-green-500'>&lt;</span>
        Pass
        <span className='text-green-500'>/OP&gt;</span>

        </div>
        <ul className='text-white flex gap-5 '>
          <a className='hover:font-bold hover:cursor-pointer' href="https://github.com/deepSingh7505">Github</a>
          <a className='hover:font-bold hover:cursor-pointer' href="https://www.linkedin.com/in/deepsingh7505/">LinkedIn</a>
          <a className='hover:font-bold hover:cursor-pointer' href="http://www.instagram.com/deepsingh_7505/">Instagram</a>
         
        </ul>
    </nav>
  </>
  )
}

export default Navbar
