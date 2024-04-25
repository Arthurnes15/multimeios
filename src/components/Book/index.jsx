import '../../vars/vars.css'
import './styles.css';
import React, { useState } from 'react';
import { Modal } from '../Modal';
import { SvgEdit } from '../../components/Icons/edit';
import { SvgTrash } from '../../components/Icons/trash';
import { SvgBook } from '../Icons/book';
import { SvgRent } from '../Icons/rent';
import  Axios  from 'axios';

export const Book = ({ id, nameBook, nameAuthor, publisher, img, alt, gender, isbn, amount, cdd, publication, listBook, setListBook }) => {
    const [showInfoBook, setShowInfo] = useState(false); 
    const [showModal, setShowModal] = useState(false);

    const handleDeleteBook = () => {
        const question = window.confirm("Você tem certeza que deseja apagar esse livro?");
        if(question === true ) {
            Axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => {
            document.location.reload();
            })    
        }
    }

    return (
        <>
        <div className="book" onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>
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
                            <p className="d-lg-none id">Nº do livro: <strong>{id}</strong></p>
                            <div className="events-svg">
                                <SvgEdit onClick={() => {setShowModal(true)}}></SvgEdit>
                                <SvgTrash onClick={() => {handleDeleteBook()}}></SvgTrash>
                                <SvgRent></SvgRent>
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

        {showModal && <Modal openModal={"open"}
        id={id}
        name={nameBook}
        author={nameAuthor}
        publisher={publisher}
        gender={gender}
        isbn={isbn}
        amount={amount}
        cdd={cdd}
        listBook={listBook}
        setListBook={setListBook}
        onClick={() => {setShowModal(false)}}
        ></Modal>}

    </>
    )
}