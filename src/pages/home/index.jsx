import { useState, useEffect, useRef } from 'react';

import { Navbar } from '../../components/Navbar/index';
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Input } from '../../components/Input';
import { Books } from '../../components/Books';
import { Button } from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import leftArrow from '../../assets/img/left-arrow.png';
import validateToken from '../../utils/validateToken';
import axiosClient from '../../config/axiosClient';
import './styles.css';

export const Home = () => {
    const [auth, setAuth] = useState(false);
    const [listBooks, setListBooks] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const carousel = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            axiosClient.get("getBooks")
                .then((res) => {
                    setListBooks(res.data);
                });
        } else {
            validateToken()
                .then(() => setAuth(true))
                .catch(() => navigate("/"))
        };
    }, [auth, navigate]);

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
            {!auth && <Spinner/>}
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

                    <div className="buttons">
                        <div>
                            <Button type={"button"} className={"left-arrow"} onClick={handleLeftClick}
                                text={<img src={leftArrow} alt="left-arrow" />}
                            />
                            <Button type={"button"} className={"right-arrow"} onClick={handleRightClick}
                                text={<img src={leftArrow} alt="right-arrow" />}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <section className="books" ref={carousel}>
                {filteredBooks.length > 0 && <Books books={filteredBooks}></Books>}
            </section>
            <Footer />
        </>
    )
}