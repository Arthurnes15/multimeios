import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Navbar } from "../../components/Navbar";
import { SvgEdit } from "../../components/Icons/edit";
import { SvgTrash } from "../../components/Icons/trash";
import './styles.css';

export const Students = () => {
    const [listStudents, setListStudents] = useState();

    useEffect(() => {
        Axios.get("http://localhost:3001/getStudents")
        .then((response) => {
            setListStudents(response.data)}
        )
    }, []);

    return (
        <>
            <Navbar/>
            <table class="container table">
                <thead>
                    <tr>
                        <th scope="col">ID do Aluno</th>
                        <th scope="col">Nome do Aluno</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Turma/Série</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {typeof listStudents !== "undefined" && listStudents.map((student) => {
                        return (
                            <tr>
                                <th scope="row">{student.id_aluno}</th>
                                <td>{student.nome_aluno}</td>
                                <td>{student.email_aluno}</td>
                                <td>{student.nome_turma}</td>
                                <td><SvgEdit></SvgEdit></td>
                                <td><SvgTrash></SvgTrash></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}