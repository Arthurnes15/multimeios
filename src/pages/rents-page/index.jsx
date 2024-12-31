import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Rent } from "../../components/Rent";
import { Footer } from "../../components/Footer";
import { dateFormatter } from "../../utils";
import book_placeholder from '../../assets/img/book-placeholder.png';
import axiosClient from "../../config/axiosClient";
import validateToken from "../../utils/validateToken";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import './styles.css';

export const Rents = () => {
    const [auth, setAuth] = useState(false);
    const [listRents, setListRents] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            axiosClient.get("getRents")
                .then((res) => {
                    setListRents(res.data);
                });
        } else {
            validateToken()
                .then(() => setAuth(true))
                .catch(() => navigate("/"))
        };
    }, [auth, navigate]);

    return(
        <>
            <Navbar />

            {!auth && <Spinner/>}

            <article className="container rents">
                {typeof listRents !== "undefined" && 
                    listRents.map((value) => {
                        return(
                                <Rent key={value.id_aluguel}
                                idRent={value.id_aluguel}
                                classRent={"rent"}
                                imgRented={value.url_imagem || book_placeholder }
                                nameBook={value.nome_livro}
                                nameStudent={value.nome_aluno}
                                responsible={value.responsavel_aluguel}
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
    );
}