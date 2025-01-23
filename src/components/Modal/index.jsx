import { useEffect, useState } from "react";
import { Label } from "../Label";
import { Input } from "../Input";
import { Select } from "../Select";
import { Option } from "../Option";
import { Button } from "../Button";
import { BsXCircle } from "react-icons/bs";

import axiosClient from "../../config/axiosClient";
import './styles.css';

export const Modal = ({ id_book, status, open, close }) => {
    const [values, setValues] = useState();
    const [listStudents, setListStudents] = useState();

    useEffect(() => {
        axiosClient.get("getStudents")
            .then((response) => {
                setListStudents(response.data);
            });
    },
        []);

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };

    const handleClickRent = () => {
        axiosClient.post("rent", {
            book_id: id_book,
            responsible: values.responsible,
            student: values.student,
            status: status,
            date_return: values.date_return
        })
        .then(() => {
            document.location.reload();
        })
        .catch(() => alert("Erro ao alugar livro"));
    };

    if (open) {
        return (
            <div className="background" >
                <div id="modal">
                    <div className="header">
                        <h2>Aluguel de Livros</h2>
                        <BsXCircle size={40} className="text-danger" onClick={close} />
                    </div>
                    <Input name={id_book}
                        type={"hidden"}
                        onChange={handleChangeValues}
                    />

                    <Label text={"Responsável pelo aluguel: "}></Label>
                    <Input name={"responsible"}
                        onChange={handleChangeValues}
                    />

                    <Label text={"Data de devolução:"} />
                    <Input name={"date_return"}
                        type={"date"}
                        onChange={handleChangeValues}
                    />

                    <Label text={"Aluno: "}></Label>
                    <Select name={"student"}
                        firstOption={"Escolha o aluno"}
                        onChange={handleChangeValues}
                        render={typeof listStudents !== "undefined" && listStudents.map((student) => {
                            return (
                                <Option key={student.id_aluno} value={student.id_aluno}
                                    text={student.nome_aluno}
                                ></Option>
                            )
                        })}
                    ></Select>

                    <Input name={status}
                        type={"hidden"}
                        onChange={handleChangeValues}
                    />

                    <br />
                    <Button text={"Alugar"}
                        className={"btn btn-warning"}
                        onClick={() => handleClickRent()}></Button>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}