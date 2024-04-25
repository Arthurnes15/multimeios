import logo from '../../assets/img/Multimeios-Logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './styles.css';
import { SvgHome } from '../Icons/home';
import { SvgExclamation } from '../Icons/exclamation';
import { SvgRented } from '../Icons/rented';
import { SvgSent } from '../Icons/sent';
import { SvgStudent } from '../Icons/student';
import { Link } from 'react-router-dom';


export const Navbar = () => (
    <nav className="navbar navbar-expand-lg bg-light ">
        <div className="container-fluid">
            <a className="navbar-brand" href=""><img src={logo} className='logo' alt="logo"/></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to={"/"}><SvgHome></SvgHome>Tela Inicial</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/"}><SvgExclamation></SvgExclamation>Pendências</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/"}><SvgRented></SvgRented>Alugados</Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link to={"/"}><SvgSent></SvgSent>Entregues</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"students"}><SvgStudent></SvgStudent>Alunos</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)