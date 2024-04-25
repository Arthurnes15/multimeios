import React, { useState, useEffect, useRef} from 'react';
import Axios from 'axios';
import { Navbar } from '../../components/Navbar/index';
import { Container } from '../../components/Container';
import { Book } from '../../components/Book';
import { Footer } from '../../components/Footer';
import leftArrow from '../../assets/img/left-arrow.png';

import './styles.css';

export const Home = () => {
    const [listBooks, setListBooks] = useState();

    const carousel = useRef();

    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }

    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/getBooks")
        .then((response) => {
            setListBooks(response.data)}
        )
    }, [])

    return (
        <>
            <Navbar/>
                <Container/>
                <div className="header-carousel">
                    <div className="title">
                        <h1>Catálogo de Livros</h1>
                    </div>
                    <div className="buttons">
                        <button className="left-arrow" onClick={handleLeftClick}>
                            <img src={leftArrow} alt="left-arrow"/>
                        </button>
                        <button className="right-arrow" onClick={handleRightClick}>
                            <img src={leftArrow} alt="right-arrow" />
                        </button>
                    </div>

                </div>

                    <section className="container-books">
                        <div className="books" ref={carousel}>
                            {typeof listBooks !== "undefined" &&
                            listBooks.map((value) => {
                                return (
                                    <Book key={value.id_livro}
                                    id={value.id_livro}
                                    listBook={listBooks}
                                    setListBook={setListBooks}
                                    nameBook={value.nome_livro}
                                    nameAuthor={value.nome_autor}
                                    publisher={value.editora}
                                    publication={value.data_publicacao}
                                    gender={value.genero}
                                    isbn={value.ISBN}
                                    cdd={value.CDD}
                                    amount={value.n_exemplares}
                                    img={value.url_imagem}
                                    alt={value.nome_livro}
                                    />
                                )
                            })}
                        </div>
                    </section>

            <Footer/>
        </>

    )
}