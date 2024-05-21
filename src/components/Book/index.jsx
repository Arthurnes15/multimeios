import React, { useState, useEffect } from 'react';
import { SvgEdit } from '../../components/Icons/edit';
import { SvgTrash } from '../../components/Icons/trash';
import { SvgBook } from '../Icons/book';
import { SvgRent } from '../Icons/rent';
import  Axios  from 'axios';
import { Modal } from '../Modal';
import '../../vars/vars.css'
import './styles.css';

export const Book = ({ id, nameBook, nameAuthor, publisher, img, alt, gender, isbn, amount, cdd, publication}) => {
    const [openModal, setOpenModal] = useState(false);
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
        <div className="book" onMouseEnter={() => setShowInfoBook(true)} onMouseLeave={() => setShowInfoBook(false)}>
                    {showInfoBook && <div className="over-book">
                        <div className="book-details">
                            <p className="name_book"><SvgBook></SvgBook><strong>{ nameBook }</strong></p>
                            <p className="name_author">{ nameAuthor }</p>
                            <br />
                            <p className="publisher"><strong>Editora:</strong> { publisher }</p>
                            <p className="gender"><strong>Gênero:</strong> { gender }</p>
                            <p className="isbn"><strong>ISBN:</strong> { isbn }</p>
                            <p className="cdd"><strong>CDD:</strong> { cdd }</p>
                            <p className="amount"><strong>Quantidade:</strong> { amount }</p>
                            {/* <p className="publication"><strong>Data de Publicação:</strong> { publication }</p> */}
                            <p className="d-lg-none id">Nº do livro: <strong>{id}</strong></p>
                            <div className="events-svg">
                                <SvgEdit></SvgEdit>
                                <SvgTrash onClick={() => {handleDeleteBook()}}></SvgTrash>
                                <SvgRent onClick={() => setOpenModal(true)}></SvgRent>
                            </div>                          
                        </div>
                    </div>}
                <div className="book__img-title">
                    <div className="image-book">
                        <img src={img} alt={alt} className='img'/>
                    </div>
                    <h5 className='main_name-book'> { nameBook } </h5>
                    <p className="main_author-book">{ nameAuthor }</p>
                </div>
        </div>
    </>
    )
}