import { useState } from "react";
import IconRenderer from "../components/icons"



const ChangePassword = () => {
    const [data, setData] = useState({
        password: '',
        password_confirmation: ''
    })


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(data.password && data.password_confirmation){
            if(data.password === data.password_confirmation){
    
            }else{
                setErrors([{
                    path: 'password_confirmation',
                    msg: 'Password did not match.'
                }])
            }
        }else{
            setErrors([]);
            if(!data.password){
                setErrors(prev => [...prev, {
                    path: 'password',
                    msg: 'Please enter a valid password.'
                }])
            }

            if(!data.password_confirmation){
                setErrors(prev => [...prev, {
                    path: 'password_confirmation',
                    msg: 'Password confirmation is required.'
                }])
            }
        }
    }

    type Error = {
        path: string;
        msg: string;
    }
    const [errors, setErrors] = useState<Error[]>([]);

    return (
        <>
            <div className='w-screen h-screen flex items-center justify-center bg-gray-200'>
                <form onSubmit={handleSubmit} className='bg-white rounded w-[400px] p-6 text-gray-600 shadow-xl'>
                    <h1 className='text-center text-3xl font-semibold pb-6'>Change Password</h1>
                    {
                        errors.find((err) => err.path == "all") ? (
                            <div className='bg-red-500/20 w-full h-10 mb-4 rounded border border-red-500 flex items-center justify-center text-red-500'>
                                <IconRenderer name={'warning'} className={'w-5 h-5 mr-1'} />
                                <p className='text-sm font-semibold'>{ errors.find((err) => err.path == "all")?.msg }</p>
                            </div>
                        ) : null
                    }
                    <div className='relative mb-3'>
                        {/* <IconRenderer name={'password'} className={'absolute top-[11px] left-[9px] w-6 h-6'} /> */}
                        <input type="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} className='border w-full pb-2 pt-3 rounded border-gray-300 pl-3 font-semibold text-gray-600' placeholder='New Password' autoComplete={'off'} />
                        {
                            errors.find((err) => err.path == "password") ? (
                                <p className='text-red-500 text-sm font-semibold italic'>{ errors.find((err) => err.path == "password")?.msg }</p>
                            ) : null
                        }
                    </div>
                    <div className='relative'>
                        {/* <IconRenderer name={'password'} className={'absolute top-[11px] left-[9px] w-6 h-6'} /> */}
                        <input type="password" value={data.password_confirmation} onChange={(e) => setData({...data, password_confirmation: e.target.value})} className='border w-full pb-2 pt-3 rounded border-gray-300 pl-3 font-semibold text-gray-600' placeholder='New Password Confirmation' autoComplete={'off'} />
                        {
                            errors.find((err) => err.path == "password_confirmation") ? (
                                <p className='text-red-500 text-sm font-semibold italic'>{ errors.find((err) => err.path == "password_confirmation")?.msg }</p>
                            ) : null
                        }
                    </div>
                    <div>
                        <button type='submit' className='w-full mt-5 border py-2 rounded font-bold text-white bg-blue-600 tracking-wider shadow-lg'>UPDATE</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePassword