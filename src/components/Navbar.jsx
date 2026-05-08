import React from 'react'

const Navbar = () => {
  return (
    <nav className= 'bg-slate-800 flex items-center justify-around'>
    <div className='text-2xl text-white font-bold'>
        <span className=' text-green-500'>&lt;</span>
        Pass
        <span className='text-green-500'>/OP&gt;</span>

        </div>
        <ul className='flex gap-5 '>
            <li className='hover:font-bold'>Home</li>
            <li className='hover:font-bold'>About</li>
            <li className='hover:font-bold'>Contect</li>
        </ul>
    </nav>
  )
}

export default Navbar
