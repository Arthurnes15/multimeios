import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar"
import { Input } from "../../components/Input";
import Axios from "axios";
import './styles.css';
import { AllBooks } from "../../components/AllBooks";
import { Footer } from "../../components/Footer";

export const BooksCatalog = () => {
    const [listBooks, setListBooks] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        Axios.get("http://localhost:3001/getBooks")
        .then((response) => {
            setListBooks(response.data)
        })
    }, []);

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
            <header className="container header-allBooks">
                <h1>Todo o acervo: </h1>
                <div className="input-search-book">
                    <Input placeholder={"Procure um livro:"}
                    type={"search"}
                    value={searchValue}
                    onChange={handleChangeSearch}
                    />
                </div>
            </header>
            <AllBooks books={filteredBooks}></AllBooks>
            <Footer />
        </>
    )
}