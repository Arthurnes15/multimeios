import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { Navbar } from '../../components/Navbar/index';
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Input } from '../../components/Input';
import leftArrow from '../../assets/img/left-arrow.png';
import { Books } from '../../components/Books';
import { Button } from '../../components/Button';
import './styles.css';
import { Link } from 'react-router-dom';

export const Home = () => {
    const [listBooks, setListBooks] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const carousel = useRef();

    useEffect(() => {
        Axios.get("http://localhost:3001/getBooks")
        .then((response) => {
            setListBooks(response.data)
        })
    }, []);

    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    };

    const filteredBooks = !!searchValue ? listBooks.filter(book => {
        return book.nome_livro.toLowerCase().includes(searchValue.toLowerCase())
    }) : listBooks;

    const handleChangeSearch = (e) => {
        const { value } = e.target;
        setSearchValue(value);
    }

    return (
        <>
            <Navbar />
            <Container />
            <header className="header-carousel">
                <div className="title">
                    <Link to={"/books"}>
                        <h1>Catálogo de Livros</h1>
                    </Link>
                </div>

                <div className="search-buttons">
                    <div className="input-search">
                        <Input placeholder={"Buscar um livro"}
                        type={"search"}
                        value={searchValue}
                        onChange={handleChangeSearch}
                        />
                    </div>

                    <Button className={"left-arrow"} onClick={handleLeftClick}
                    text={<img src={leftArrow} alt="left-arrow" />}
                    />

                    <Button className={"right-arrow"} onClick={handleRightClick}
                    text={<img src={leftArrow} alt="right-arrow" />}
                    />
                </div>
            </header>

            <section className="books" ref={carousel}>
                {filteredBooks.length > 0 && <Books books={filteredBooks}></Books>}
            </section>
            <Footer />
        </>
    )
}