import Axios  from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Rent } from "../../components/Rent";
import { Footer } from "../../components/Footer";
import { dateFormatter } from "../../utils";
import './styles.css'

export const Rents = () => {
    const [listRents, setListRents] = useState();

    useEffect(() => {
        Axios.get("http://localhost:3001/rents")
        .then((response) => {
            setListRents(response.data)
        })
    }, []);

    return(
        <>
            <Navbar />
            <h1>Aluguéis</h1>
            <div className="container rents">
                {typeof listRents !== "undefined" && 
                    listRents.map((value) => {
                        return(
                                <Rent key={value.id_aluguel}
                                idRent={value.id_aluguel}
                                classRent={"rent"}
                                imgRented={value.url_imagem}
                                nameBook={value.nome_livro}
                                nameStudent={value.nome_aluno}
                                groupStudent={value.nome_turma}
                                dateRent={dateFormatter(value.data_aluguel)}
                                dateReturn={dateFormatter(value.data_devolucao)}
                                />
                        )
                    })
                }
            </div>
            <Footer />
        </>
    );
}