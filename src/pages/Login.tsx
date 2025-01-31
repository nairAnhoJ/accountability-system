import React from 'react'
import icons from '../components/icons'

function Login() {

    const IconRenderer = ({name, className}) => {
        const Icon = icons[name];
        return Icon ? <Icon className={className} /> : null;
    }

    return (
        <>
            <div className='w-screen h-screen flex items-center justify-center bg-gray-200'>
                <div className='bg-white rounded w-[400px] p-6 text-gray-600'>
                    <h1 className='text-center text-3xl font-semibold pb-6'>Accountability System</h1>
                    <div className='relative pb-3'>
                        <IconRenderer name={'user'} className={'absolute top-1/2 left-[6px] -translate-y-1/2 w-6 h-6'} />
                        <input type="text" className='border w-full py-2 rounded border-gray-300 pl-10' />
                    </div>
                    <div className='relative'>
                        <IconRenderer name={'password'} className={'absolute top-1/2 left-[6px] -translate-y-1/2 w-6 h-6'} />
                        <input type="password" className='border w-full py-2 rounded border-gray-300 pl-10' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login