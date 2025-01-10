import React from 'react'
import IconMoon from '../assets/iconMoon'
import IconSun from '../assets/IconSun'

function Header() {
  return (
    <div className='w-screen h-16 bg-white'>
        <div className='flex items-center justify-between py-3 px-10 h-full'>
            <h1 className='text-gray-500 font-bold text-xl'>Accountability System</h1>
            <div className='h-full'>
                <button className='h-full aspect-square hover:bg-gray-100 rounded-lg flex items-center justify-center'>
                    <IconSun className='text-gray-500 w-6 h-6'></IconSun>
                    {/* <IconMoon className='text-gray-500 w-6 h-6'></IconMoon> */}
                </button>
            </div>
        </div>
    </div>
  )
}

export default Header