import React, { useState } from 'react';
import { SvgEdit } from '../../components/Icons/edit';
import { SvgTrash } from '../../components/Icons/trash';
import { SvgBook } from '../Icons/book';
import { SvgRent } from '../Icons/rent';
import { Modal } from '../Modal';
import { ModalEdit } from '../ModalEditBook';
import '../../vars/vars.css';
import './styles.css';
import axiosClient from '../../config/axiosClient';

export const Book = ({ id, nameBook, idAuthor, nameAuthor, idPublisher, publisher, img, alt,idGender, gender, isbn, amount, cdd, publication, volume }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [showInfoBook, setShowInfoBook] = useState(false); 
    
    const handleDeleteBook = () => {
        const question = window.confirm("Você tem certeza que deseja apagar esse livro?");
        if(question === true) {
            axiosClient.delete(`/delete/${id}`)
            .then(() => {
                document.location.reload();
            });    
        }
    };

    return (
        <>
            <Modal
            open={openModal}
            close={() => {setOpenModal(false)}}
            id_book={id}
            status={1}
            />

            <ModalEdit 
            openEdit={openModalEdit}
            close={() => {setOpenModalEdit(false)}}
            id_book={id}
            defaultAuthor={idAuthor}
            defaultPublisher={idPublisher}
            defaultGender={idGender}
            defaultName={nameBook}
            defaultAmount={amount}
            defaultISBN={isbn}
            defaultPublication={publication}
            defaultCDD={cdd}
            defaultVolume={volume}
            ></ModalEdit>
        
            <div className="book" onMouseEnter={() => setShowInfoBook(true)} onMouseLeave={() => setShowInfoBook(false)}>
                        {showInfoBook && <div className="over-book">
                            <div className="book-details">
                                <p className="name_book"><SvgBook></SvgBook><strong>{ nameBook }</strong></p>
                                <p className="name_author">{ nameAuthor }</p>
                                <br />
                                <p className="publisher"><strong>Editora:</strong> { publisher }</p>
                                <p className="gender"><strong>Gênero:</strong> { gender }</p>
                                <p className="isbn"><strong>ISBN:</strong> { isbn }</p>
                                <p className="volume"><strong>Volume:</strong> { volume }</p>
                                <p className="cdd"><strong>CDD:</strong> { cdd }</p>
                                <p className="amount"><strong>Quantidade:</strong> { amount }</p>
                                <p className="publication"><strong>Data de Publicação:</strong> { publication }</p>
                                <p className="d-none id">Nº do livro: <strong>{id}</strong></p>
                                <p className="d-none id">Nº do autor: <strong>{idAuthor}</strong></p>
                                <p className="d-none id">Nº do editora: <strong>{idPublisher}</strong></p>
                                <p className="d-none id">Nº do gênero: <strong>{idGender}</strong></p>
                                <div className="events-svg">
                                    <SvgEdit onClick={() => setOpenModalEdit(true)}></SvgEdit>
                                    <SvgTrash onClick={() => {handleDeleteBook()}}></SvgTrash>
                                    <SvgRent onClick={() => setOpenModal(true)}></SvgRent>
                                </div>                          
                            </div>
                        </div>}
                    <div className="book__img-title">
                        <div className="image-book">
                            <img src={ img } alt={ alt }/>
                        </div>
                        <h5> { nameBook } </h5>
                        <p>{ nameAuthor }</p>
                    </div>
            </div>
    </>
    )
}