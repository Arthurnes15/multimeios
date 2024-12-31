import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SvgBookHome } from "../Icons/homebook";
import { SvgArrow } from "../Icons/arrow";
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
                    <Link to={"/registerStudent"}><button className={"btn-register"}>Cadastrar Aluno <SvgArrow></SvgArrow></button></Link>
                    <Link to={"/registerBook"} className="link"> Cadastrar Livro</Link>
                </div>
            </div>

            <div className="icon-book">
                <SvgBookHome/>
            </div>
        </div>
    )
}