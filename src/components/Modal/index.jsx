import React, { useState, useEffect } from 'react';
import './styles.css'
import { SvgEdit } from '../Icons/edit';
import { Select } from '../Select';
import { Option } from '../Option';
import Axios from 'axios';

export const Modal = ({ id, name, author, publisher, gender, isbn, amount, cdd, openModal, onClick }) => {
    const [listAuthors, setListAuthors] = useState();
    const [listGenders, setListGenders] = useState();
    const [listPublishers, setListPubli] = useState();
    
    const [editValues, setEditValues] = useState({
        id: id,
        name: name,
        author: author,
        publisher: publisher,
        gender: gender,
        isbn: isbn,
        amount: amount,
        cdd: cdd
    })

    const handleEditBook = () => {
        Axios.put("http://localhost:3001/edit", {
            id: editValues.id,
            name: editValues.name,
            author: editValues.author,
            publisher: editValues.publisher,
            gender: editValues.gender,
            isbn: editValues.isbn,
            amount: editValues.amount,
            cdd: editValues.cdd,
        })
    }

    const handleChangeValues = (value) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [value.target.id]: value.target.value
        }))
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/getAuthors")
        .then((response) => {
          setListAuthors(response.data)}
        )

        Axios.get("http://localhost:3001/getGenders")
        .then((response) => {
        setListGenders(response.data)}
        )

        Axios.get("http://localhost:3001/getPublishers")
        .then((response) => {
        setListPubli(response.data)}
        )
    }
    )

    return (
        <dialog open={openModal} className="modal-edit">
            <div className="modal-dialog-edit">
                <div className="modal-content-edit">
                    <div className="modal-header-edit">
                        <h1 className="modal-title-edit fs-5">
                            <SvgEdit></SvgEdit>
                            Editar Livro</h1>
                        <button type="button" onClick={onClick} className="btn-close" aria-label="Close"></button>
                    </div>
                    <div className="modal-body-edit">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="new-name-book" className="col-form-label">Novo nome do Livro</label>
                                <input type="text" className="form-control" id="name" defaultValue={name} onChange={handleChangeValues} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="col-form-label">Novo nome do autor: </label>
                                
                                <Select id={"author"} onChange={handleChangeValues} firstOption={"Escolha o novo nome do autor do livro"}
                                    render={typeof listAuthors !== "undefined" && listAuthors.map((valueAuthor) => {
                                        return (
                                            <Option key={valueAuthor.id_autor} value={valueAuthor.id_autor} text={valueAuthor.nome_autor}
                                            ></Option>
                                        )
                                    })}
                                ></Select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="col-form-label">Nova editora: </label>

                                <Select id={"publisher"} onChange={handleChangeValues} firstOption={"Escolha a nova editora do livro"}
                                    render={typeof listPublishers !== "undefined" && listPublishers.map((valuePub) => {
                                        return (
                                            <Option key={valuePub.id_editora} value={valuePub.id_editora} text={valuePub.editora}
                                            ></Option>
                                        )
                                    })}
                                ></Select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="" className="col-form-label">Novo gênero: </label>
                                
                                <Select id={"gender"} onChange={handleChangeValues} firstOption={"Escolha o novo gênero do livro"}
                                    render={typeof listGenders !== "undefined" && listGenders.map((valueGender) => {
                                        return (
                                            <Option key={valueGender.id_genero} value={valueGender.id_genero} text={valueGender.genero}
                                            ></Option>
                                        )
                                    })}
                                ></Select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="" className="col-form-label">Novo ISBN: </label>
                                <input type="text" className="form-control" id="isbn" defaultValue={isbn} onChange={handleChangeValues} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="" className="col-form-label">Novo número de exemplares: </label>
                                <input type="text" className="form-control" id="amount" defaultValue={amount} onChange={handleChangeValues} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="" className="col-form-label">Novo Código do Livro: </label>
                                <input type="text" className="form-control" id="cdd" defaultValue={cdd} onChange={handleChangeValues} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer-edit">
                        <button type="button" className="btn btn-danger" onClick={onClick}>Fechar Modal</button>
                        <button type="button" className="btn btn-primary" onClick={handleEditBook}>Atualizar Livro</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}