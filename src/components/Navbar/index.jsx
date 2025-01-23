import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsHouse } from 'react-icons/bs';
import { BsBagCheck } from 'react-icons/bs';
import { BsPersonFill } from 'react-icons/bs';
import { BsJournals } from 'react-icons/bs';
import { BsListStars } from 'react-icons/bs';
import { BsBoxArrowRight } from 'react-icons/bs';

import axiosClient from '../../config/axiosClient';
import logo from '../../assets/img/Multimeios-Logo.png';
import validateToken from '../../utils/validateToken';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './styles.css';

export const Navbar = () => {
    const [name, setName] = useState('');
    useEffect(() => {
        validateToken()
            .then((res) => setName(res.data.username))
            .catch(err => console.log(err))
    }, []);

    const handleLogout = () => {
        axiosClient.get("auth/logout")
        .then(res => {
            localStorage.removeItem('token', res.data.token)
            localStorage.removeItem('username', res.data.name)
            document.location.reload();
        })
        .catch(error => console.log(error))
        
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <img src={logo} className='logo' alt="logo" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link"><BsHouse size={24}/>
                            Tela Inicial</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="/">
                                <BsBagCheck size={24} />Aluguéis
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to={"/rents"} className="dropdown-item text-info bg-white">Alugados</Link></li>
                                <li> <Link to={"/rents-pending"} className="dropdown-item text-danger bg-white">Pendentes</Link></li>
                                <li><Link to={"/rents-returned"} className="dropdown-item text-success bg-white">Entregues</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="/">
                                <BsJournals size={24} />Escola
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to={"/students"} className="dropdown-item text-info bg-white ">Alunos</Link></li>
                                <li><Link to={"/groups"} className="dropdown-item text-info bg-white">Turmas</Link>
                                </li>
                                <li><Link to={"/registerUser"} className="dropdown-item text-info bg-white">Criar Usuário</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to={"/credits"} className="nav-link">
                            <BsListStars size={24} /> Créditos</Link>
                        </li>
                    </ul>
                    <span className="user">
                        <span className="icon-user">
                            <BsPersonFill size={24} />
                        </span>
                        <span className="username">
                            {name}
                        </span>
                        <span className="icon-logout">
                            <BsBoxArrowRight size={24} className="text-danger" onClick={() => { handleLogout() }}/>
                        </span>
                    </span>
                </div>
            </div>
        </nav>
    )
}