import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { BsArrowRightCircleFill } from "react-icons/bs";
import book_icon from '../../assets/img/book-icon-clipart.png';

import validateToken from "../../utils/validateToken";
import './styles.css';

export const Container = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        validateToken()
            .then((res) => setName(res.data.username))
            .catch(err => console.log(err))
    }, []);

    return (
        <div className="presentation">
            <div className="actions">
                <h1 className="title">Olá, {name}</h1>
                <p className="paragraph">O que você deseja fazer hoje?</p>
                <div className="buttons-actions">
                    <Link to={"/registerStudent"}><button type="button" className="btn-register">Cadastrar Aluno <BsArrowRightCircleFill size={30} /></button></Link>
                    <Link to={"/registerBook"} className="link"> Cadastrar Livro</Link>
                </div>
            </div>

            <div className="icon-book">
                <img src={book_icon} alt="book_icon" />
            </div>
        </div>
    )
}