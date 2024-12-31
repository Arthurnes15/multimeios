import { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Rent } from '../../components/Rent';
import { Footer } from '../../components/Footer';
import { dateFormatter } from '../../utils';
import book_placeholder from '../../assets/img/book-placeholder.png';
import axiosClient from '../../config/axiosClient';
import './styles.css';
import validateToken from '../../utils/validateToken';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';

export const RentsReturned = () => {
    const [auth, setAuth] = useState(false);
    const [listRentsReturned, setListRentsReturned] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(auth) {
            axiosClient.get("getRentsReturned")
            .then((res) => {
                setListRentsReturned(res.data)
            })
        }
        else {
            validateToken()
            .then(() => setAuth(true))
            .catch(() => navigate("/"))
        }
    }, [auth, navigate]);

    return(
        <>
            <Navbar />
            {!auth && <Spinner/>}
            <article className="container rents">
                {typeof listRentsReturned !== "undefined" && 
                    listRentsReturned.map((value) => {
                        return(
                                <Rent key={value.id_aluguel}
                                idRent={value.id_aluguel}
                                classRent={"rent-checked"}
                                imgRented={value.url_imagem || book_placeholder}
                                nameBook={value.nome_livro}
                                nameStudent={value.nome_aluno}
                                groupStudent={value.nome_turma}
                                dateRent={dateFormatter(value.data_aluguel)}
                                dateReturn={dateFormatter(value.data_devolucao)}
                                />
                        )
                    })
                }
            </article>
            <Footer />
        </>
    )
}