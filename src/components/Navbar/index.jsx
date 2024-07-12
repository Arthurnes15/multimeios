import logo from '../../assets/img/Multimeios-Logo.png';
import { SvgHome } from '../Icons/home';
import { SvgRented } from '../Icons/rented';
import { Link } from 'react-router-dom';
import { SvgCredit } from '../Icons/credits';
import { SvgNotebook } from '../Icons/notebook';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './styles.css';

export const Navbar = () => (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <img src={logo} className='logo' alt="logo" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link"><SvgHome></SvgHome>Tela Inicial</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <SvgRented />Aluguéis
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link to={"/rents"} className="dropdown-item text-info bg-white">Alugados</Link></li>
                            <li> <Link to={"/rents-pending"} className="dropdown-item text-danger bg-white">Pendentes</Link></li>
                            <li><Link to={"/rents-returned"} className="dropdown-item text-success bg-white">Entregues</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <SvgNotebook />Escola
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link to={"/students"} className="dropdown-item text-info bg-white ">Alunos</Link></li>
                            <li><Link to={"/groups"} className="dropdown-item text-info bg-white">Turmas</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link to={"/credits"} className="nav-link"><SvgCredit /> Créditos</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)