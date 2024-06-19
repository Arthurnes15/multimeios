import { Label } from "../Label";
import { Input } from "../Input";
import { Select } from "../Select";
import { Option } from "../Option";
import { Button } from "../Button";
import { SvgClose } from "../Icons/close";
import { useEffect, useState } from "react";
import Axios from "axios";
import './styles.css';

export const Modal = ({ id_book, id_student, defaultName, defaultISBN, defaultCDD, defaultAmount, defaultNameStudent, defaultEmail, responsible, status, open, openEdit, openEditStudent, close, dateReturn }) => {
    const [values, setValues] = useState();
    const [editValues, setEditValues] = useState({
        id: id_book,
        nameBook: defaultName,
        amount: defaultAmount,
        isbn: defaultISBN,
        cdd: defaultCDD
    });
    const [editStudentValues, setEditStudentValues] = useState({
        id_student: id_student,
        nameStudent: defaultNameStudent,
        email: defaultEmail,
    });
    const [listStudents, setListStudents] = useState();
    const [listGroups, setListGroups] = useState();
    const [listAuthors, setListAuthors] = useState();
    const [listGenders, setListGenders] = useState();
    const [listPublishers, setListPubli] = useState();

    useEffect(() => {
        Axios.get("http://localhost:3001/getStudents")
            .then((response) => {
                setListStudents(response.data);
            });
        
        Axios.get("http://localhost:3001/getGroups")
            .then((response) => {
                setListGroups(response.data)
            });

        Axios.get("http://localhost:3001/getAuthors")
            .then((response) => {
                setListAuthors(response.data)
            });

        Axios.get("http://localhost:3001/getGenders")
            .then((response) => {
                setListGenders(response.data)
            });

        Axios.get("http://localhost:3001/getPublishers")
            .then((response) => {
                setListPubli(response.data)
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
        Axios.post("http://localhost:3001/rent", {
            book_id: id_book,
            responsible_rent: values.responsible,
            student: values.student,
            status_rent: status,
            date_return: values.date_return
        })
        document.location.reload();
    };

    const handleChangeEditValues = (value) => {
        setEditValues((prevValue) => ({
            ...prevValue,
            [value.target.id]: value.target.value
        }));
    }
    const handleClickEdit = () => {
        Axios.put("http://localhost:3001/edit", {
            book_id: id_book,
            name_book: editValues.nameBook,
            name_author: editValues.new_author,
            publisher_book: editValues.new_publisher,
            gender_book: editValues.new_gender,
            isbn_book: editValues.isbn,
            amount_book: editValues.amount,
            cdd_book: editValues.cdd,
        });
        document.location.reload();
    };

    const handleChangeStudentValues = (value) => {
        setEditStudentValues((prevValue) => ({
            ...prevValue,
            [value.target.id]: value.target.value
        }));
    }

    const handleClickEditStudent = () => {
        Axios.put("http://localhost:3001/editStudent", {
            student_id: id_student,
            name_student: editStudentValues.nameStudent,
            email_student: editStudentValues.email,
            group: editStudentValues.new_group,
        });
        document.location.reload();
    }

    if (open) {
        return (
            <div className="background" >
                <div id="modal">
                    <div className="header">
                        <h2>Aluguel de Livros</h2>
                        <SvgClose onClick={close} />
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
                        render={typeof listStudents !== "undefined" && listStudents.map((valueStu) => {
                            return (
                                <Option key={valueStu.id_aluno} value={valueStu.id_aluno}
                                    text={valueStu.nome_aluno}
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
    }

    if (openEdit) {
        return (
            <div className="background-edit" >
                <div id="modal-edit">
                    <div className="header-edit">
                        <h2>Edição do Livro</h2>
                        <SvgClose onClick={close} />
                    </div>
                    <span className="modal-alert text-danger">Atenção: Nas opções para escolher, não esqueça de selecionar o dado atual caso não for alterá-lo.</span>

                    <Input id={id_book}
                        type={"hidden"}
                        onChange={handleChangeEditValues}
                    />

                    <Label text={"Novo nome do Livro:"}></Label>
                    <Input id={"nameBook"}
                        defaultValue={defaultName}
                        onChange={handleChangeEditValues}
                    />

                    <Label text={"Novo autor:"} />
                    <Select id={"new_author"}
                        firstOption={"Escolha o novo autor ou o atual:"}
                        onChange={handleChangeEditValues}
                        render={typeof listAuthors !== "undefined" && listAuthors.map((valueAut) => {
                            return (
                                <Option key={valueAut.id_autor} value={valueAut.id_autor}
                                    text={valueAut.nome_autor}
                                ></Option>
                            )
                        })}
                    ></Select>

                    <Label text={"Nova editora:"} />
                    <Select id={"new_publisher"}
                        firstOption={"Escolha a nova editora ou o atual:"}
                        onChange={handleChangeEditValues}
                        render={typeof listPublishers !== "undefined" && listPublishers.map((valuePub) => {
                            return (
                                <Option key={valuePub.id_editora} value={valuePub.id_editora}
                                    text={valuePub.editora}
                                ></Option>
                            )
                        })}
                    ></Select>

                    <Label text={"Novo gênero:"} />
                    <Select id={"new_gender"}
                        firstOption={"Escolha o novo do gênero ou o atual:"}
                        onChange={handleChangeEditValues}
                        render={typeof listGenders !== "undefined" && listGenders.map((valueGen) => {
                            return (
                                <Option key={valueGen.id_genero} value={valueGen.id_genero}
                                    text={valueGen.genero}
                                ></Option>
                            )
                        })}
                    ></Select>
                    <Label text={"Novo ISBN:"} />
                    <Input id={"isbn"}
                        defaultValue={defaultISBN}
                        onChange={handleChangeEditValues}
                    ></Input>

                    <Label text={"Novo numero de exemplares:"} />
                    <Input id={"amount"}
                        defaultValue={defaultAmount}
                        onChange={handleChangeEditValues}
                    ></Input>

                    <Label text={"Novo código do livro:"} />
                    <Input id={"cdd"}
                        defaultValue={defaultCDD}
                        onChange={handleChangeEditValues}
                    ></Input>
                    <br />
                    <Button text={"Editar"}
                        className={"btn btn-info text-white"}
                        onClick={() => handleClickEdit()} />
                </div>
            </div>
        )
    } if (openEditStudent) {
        return (
            <div className="background-student" >
                <div id="modal-student">
                    <div className="header-student">
                        <h2>Editar Aluno: </h2>
                        <SvgClose onClick={close}/>
                    </div>
                    <span className="modal-alert text-danger">Atenção: Nas opções para escolher, não esqueça de selecionar o dado atual caso não for alterá-lo.</span><br />
                    <Input id={id_student}
                        type={"hidden"}
                        onChange={handleChangeValues}
                    />

                    <Label text={"Novo nome do aluno: "}></Label>
                    <Input id={"nameStudent"}
                        defaultValue={defaultNameStudent}
                        onChange={handleChangeStudentValues}
                    />

                    <Label text={"Novo email do aluno:"} />
                    <Input id={"email"}
                        type={"email"}
                        defaultValue={defaultEmail}
                        onChange={handleChangeStudentValues}
                    />
                    <Label text={"Nova turma do aluno:"} />
                    <Select id={"new_group"}
                        firstOption={"Escolha a nova ou a atual turma do aluno:"}
                        onChange={handleChangeStudentValues}
                        render={typeof listGroups !== "undefined" && listGroups.map((valueGen) => {
                            return (
                                <Option key={valueGen.id_turma} value={valueGen.id_turma}
                                    text={valueGen.nome_turma}
                                ></Option>
                            )
                        })}
                    ></Select>

                    <br />
                    <Button text={"Editar"}
                        className={"btn btn-info text-white"}
                        onClick={() => handleClickEditStudent()}></Button>
                </div>
            </div>
        )
    }

    else {
        return <></>
    }
}