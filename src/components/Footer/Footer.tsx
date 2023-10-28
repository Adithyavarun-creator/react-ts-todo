import './Footer.css'
import { AiOutlineArrowUp } from 'react-icons/ai'

const Footer = () => {

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        <footer className='footer-container'>
            <div className='arrowup' onClick={scrollTop}>
                <span>
                    <AiOutlineArrowUp className='arrowup-icon' />
                </span>
            </div>
        </footer>
    )
}

export default Footer