import './Footer.css'
import { AiOutlineArrowUp } from 'react-icons/ai'

const Footer = ({ }) => {
    return (
        <footer className='footer-container'>
            <div className='arrowup'>
                <span>
                    <AiOutlineArrowUp onClick={() => window.scrollTo(0, 0)} className='arrowup-icon' />
                </span>
            </div>
        </footer>
    )
}

export default Footer