import React, { useState } from 'react';
import { SvgEdit } from '../../components/Icons/edit';
import { SvgTrash } from '../../components/Icons/trash';
import { SvgBook } from '../Icons/book';
import { SvgRent } from '../Icons/rent';
import { Modal } from '../Modal';
import { ModalEdit } from '../ModalEditBook';
import  Axios  from 'axios';
import '../../vars/vars.css'
import './styles.css';

export const Book = ({ id, nameBook, nameAuthor, publisher, img, alt, gender, isbn, amount, cdd, publication, volume}) => {
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [showInfoBook, setShowInfoBook] = useState(false); 
    
    const handleDeleteBook = () => {
        const question = window.confirm("Você tem certeza que deseja apagar esse livro?");
        if(question === true) {
            Axios.delete(`http://localhost:3001/delete/${id}`)
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
        defaultName={nameBook}
        defaultAuthor={nameAuthor}
        defaultAmount={amount}
        defaultISBN={isbn}
        defaultPublication={publication}
        defaultCDD={cdd}
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
                            <p className="d-lg-none id">Nº do livro: <strong>{id}</strong></p>
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