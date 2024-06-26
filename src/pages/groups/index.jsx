import { Navbar } from "../../components/Navbar"
import { SvgEdit } from "../../components/Icons/edit"
import { SvgTrash } from "../../components/Icons/trash"
import { useEffect, useState } from "react"
import Axios from "axios";
import "./styles.css";

export const Groups = () => {
    const [listGroups, setListGroups] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/getGroups")
        .then((response) => {
            setListGroups(response.data)
        })
    }, []);

    const handleDeleteGroup = (id) => {
        const question = window.confirm("Você tem certeza que deseja apagar essa turma?");
        if(question === true) {
            Axios.delete(`http://localhost:3001/deleteGroup/${id}`)
            .then(() => {
                document.location.reload();
            });
        }
    }
    return (
        <>
            <Navbar />
        
            <article className="container allGroups">
                <h1>Turmas Cadastradas</h1>
                <table className="container table">
                        <thead>
                            <tr>
                                <th scope="col">ID da turma</th>
                                <th scope="col">Turma</th>
                                <th scope="col">Editar</th>
                                <th scope="col">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {typeof listGroups !== "undefined" && listGroups.map((group) => {
                                return(
                                    <tr>
                                        <td>{group.id_turma}</td>
                                        <td>{group.nome_turma}</td>
                                        <td><SvgEdit></SvgEdit></td>
                                        <td><SvgTrash onClick={() => {handleDeleteGroup(group.id_turma)}}></SvgTrash></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                </table>
            </article>
        </>
    )
}