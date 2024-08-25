import { useState, useEffect } from "react";
import { SvgClose } from "../Icons/close";
import { Input } from "../Input";
import { Label } from "../Label";
import { Select } from "../Select";
import { Option } from "../Option";
import { Button } from "../Button";
import Axios from 'axios';
import './styles.css'

export const ModalEdit = ({ openEdit, id_book, defaultName, defaultAmount, defaultISBN, defaultCDD, close }) => {
    const [editValues, setEditValues] = useState({
        id: id_book,
        nameBook: defaultName,
        amount: defaultAmount,
        isbn: defaultISBN,
        cdd: defaultCDD
    });
    const [listAuthors, setListAuthors] = useState();
    const [listGenders, setListGenders] = useState();
    const [listPublishers, setListPubli] = useState();

    useEffect(() => {
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
                        maxLength={150}
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
    }
}
