import './Navbar.css'
import { useState, useEffect } from 'react'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'

const Navbar = () => {

    const [theme, setTheme] = useState('light-mode')

    const toggleTheme = () => {
        if (theme === 'dark-mode') {
            setTheme('light-mode')
        } else {
            setTheme('dark-mode')
        }
    }


    useEffect(() => {
        document.body.className = theme
    }, [theme])



    return (
        <nav className='nav-container' onClick={toggleTheme}>
            {
                theme === 'light-mode' ?
                    <div>
                        <span>
                            <MdOutlineLightMode className='lightmode-icon' title='Light Mode' />
                        </span>
                    </div> :

                    <div>
                        <span>
                            <MdOutlineDarkMode className='darkmode-icon' title='Dark Mode' /></span>
                    </div>
            }
        </nav>
    )
}

export default Navbar