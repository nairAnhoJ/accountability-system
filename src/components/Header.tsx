import { useEffect, useState } from 'react'
import icons from '../components/icons'

function Header() {
    const IconRenderer = ({ name, className }) => {
        const Icon = icons[name];
        return Icon ? <Icon className={className} /> : null;
    }

    const [dark, setDark] = useState(() => {
        if(localStorage.getItem('dark') == null){
            return 'light';
        }else{
            return localStorage.getItem('dark');
        }
    });

    useEffect(() => {
        if(dark == 'dark'){
            document.body.classList.add("dark");
        }else{
            document.body.classList.remove("dark");
        }
    }, [dark]);

    const toggleTheme = () => {
        if(dark == 'dark'){
            setDark('light');
            localStorage.setItem('dark', 'light');
        }else{
            setDark('dark');
            localStorage.setItem('dark', 'dark');
        }
    };

    return (
        <div className='w-screen h-16 bg-white dark:bg-gray-800'>
            <div className='flex items-center justify-between py-3 px-10 h-full'>
                <h1 className='text-gray-500 font-bold text-xl dark:text-white tracking-wide'>Accountability System</h1>
                <div className='h-full flex items-center gap-x-2'>
                    <button onClick={toggleTheme} className='h-full aspect-square hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center justify-center'>
                        { dark == 'dark' ? <IconRenderer name="sun" className='text-gray-400 w-6 h-6' /> : <IconRenderer name="moon" className='text-gray-500 w-6 h-6' /> }
                    </button>
                    <button className='h-full aspect-square hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center justify-center'>
                        <IconRenderer name="settings" className='dark:text-gray-400 text-gray-500 w-7 h-7' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header