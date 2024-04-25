import './styles.css';
import logo from '../../assets/img/Multimeios-Logo.png';
import { SvgInstagram } from '../Icons/instagram';


export const Footer = () => {
    return (
        <div className="footer">
            <p className="text-copyright">&copy; 2024 Multimeios </p>
            <div className="footer-logo">
                <img src={logo} width="140px" height="auto" alt="" />
            </div>
            <div className="icons">
                <span><SvgInstagram></SvgInstagram></span>
                <a href="https://www.instagram.com/multimeiosmg/" target="_blank" className='link-footer'><p>multimeiosmg</p></a>
            </div>
        </div>
    )
}