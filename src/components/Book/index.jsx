import React, { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';
import { BsBook } from 'react-icons/bs';
import { BsBagPlusFill } from 'react-icons/bs';

import { Modal } from '../Modal';
import { ModalEdit } from '../ModalEditBook';
import axiosClient from '../../config/axiosClient';
import '../../vars/vars.css';
import './styles.css';

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
                                <p className="name_book"><BsBook size={24} /><strong>{ nameBook }</strong></p>
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
                                    <BsPencilSquare size={24} className="text-info" onClick={() => setOpenModalEdit(true)} />
                                    <BsTrash3 size={24} className="text-danger" onClick={() => {handleDeleteBook()}} />
                                    <BsBagPlusFill size={24} className="text-warning" onClick={() => setOpenModal(true)} />
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