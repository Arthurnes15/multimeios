import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../../components/Navbar"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { AllBooks } from "../../components/AllBooks";
import { Footer } from "../../components/Footer";
import axiosClient from "../../config/axiosClient";
import validateToken from "../../utils/validateToken";
import './styles.css';

export const BooksCatalog = () => {
    const [auth, setAuth] = useState(false);
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [booksPerPage] = useState(10);
    const [listBooks, setListBooks] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleLoadBooks = useCallback((page, booksPerPage) => {
        axiosClient.get("getAllBooks")
            .then((response) => {
                setBooks(response.data.slice(page, booksPerPage))
                setListBooks(response.data);
            })
    }, []);

    useEffect(() => {
        if (auth) {
            handleLoadBooks(0, booksPerPage);
        } else {
            validateToken()
                .then(() => setAuth(true))
                .catch(() => navigate("/"))
        };
    }, [auth, booksPerPage, handleLoadBooks, navigate]);

    const filteredBooks = !!searchValue ? listBooks.filter(book => {
        return book.nome_livro.toLowerCase().includes(searchValue.toLowerCase())
    }) : books;

    const loadMoreBooks = () => {
        const nextPage = page + booksPerPage;
        const nextBooks = listBooks.slice(nextPage, nextPage + booksPerPage);
        books.push(...nextBooks);

        setBooks(books);
        setPage(nextPage);
    }

    const handleChangeSearch = (e) => {
        const { value } = e.target;
        setSearchValue(value);
    }

    return (
        <>
            <Navbar />
            <header className="container header-allBooks">
                <h1>Todo o acervo: </h1>
                <div className="input-search-book">
                    <Input
                        placeholder={"Procure um livro:"}
                        type={"search"}
                        value={searchValue}
                        onChange={handleChangeSearch}
                    />
                </div>
            </header>

            <AllBooks books={filteredBooks} />

            <div className="loadMoreBooks">
                <Button text="Carregar mais"
                    onClick={loadMoreBooks}
                />
            </div>

            <Footer />
        </>
    )
}