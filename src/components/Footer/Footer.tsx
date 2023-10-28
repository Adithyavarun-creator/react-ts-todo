import './Footer.css'
import { AiOutlineArrowUp } from 'react-icons/ai'

const Footer = ({ }) => {


    return (
        <footer className='footer-container'>
            <div className='arrowup' onClick={() => window.scrollTo(0, 0)}>
                <span>
                    <AiOutlineArrowUp className='arrowup-icon' />
                </span>
            </div>
        </footer>
    )
}

export default Footer