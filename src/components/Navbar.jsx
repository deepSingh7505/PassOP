import React from 'react'
import { ToastContainer, toast } from 'react-toastify';


const Navbar = () => {
  const notready =()=>{
    toast.info('Not Ready!', {
position: "top-right",
autoClose: 2500,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: false,
draggable: true,
progress: undefined,
theme: "light",
});
  }

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={2500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="light"
/>
    <nav className= 'bg-slate-800 flex items-center justify-around'>
    <div className='text-2xl text-white font-bold'>
        <span className=' text-green-500'>&lt;</span>
        Pass
        <span className='text-green-500'>/OP&gt;</span>

        </div>
        <ul className='text-white flex gap-5 '>
            <li onClick={notready} className='hover:font-bold hover:cursor-pointer'>Home</li>
            <li onClick={notready} className='hover:font-bold hover:cursor-pointer'>About</li>
            <li onClick={notready} className='hover:font-bold hover:cursor-pointer'>Contect</li>
        </ul>
    </nav>
  </>
  )
}

export default Navbar
