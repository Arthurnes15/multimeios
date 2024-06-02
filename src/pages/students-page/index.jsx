import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Students } from "../../components/Students";
import { Input } from "../../components/Input";
import Axios from "axios";
import './styles.css';

export const StudentsPage = () => {
    const [listStudents, setListStudents] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        Axios.get("http://localhost:3001/getStudents")
        .then((response) => {
            setListStudents(response.data)}
        )
    }, []);

    const filteredStudents = !!searchValue ? listStudents.filter(student => {
        return student.nome_aluno.toLowerCase().includes(searchValue.toLowerCase())
    }) : listStudents;

    const handleChangeSearch = (e) => {
        const { value } = e.target;
        setSearchValue(value);
    }

    return (
        <>
            <Navbar/>

            <article className="container">
                <header className="header-students">
                    <h1>Alunos Cadastrados</h1>
                    <div className="input-search-student">
                            <Input placeholder={"Procure um aluno"}
                            type={"search"}
                            value={searchValue}
                            onChange={handleChangeSearch}
                            />
                        </div>
                </header>

                {filteredStudents.length > 0 && <Students students={filteredStudents}></Students>}
            </article>
        </>
    )
}