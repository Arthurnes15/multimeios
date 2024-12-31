import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar"
import { Input } from "../../components/Input";
import { AllBooks } from "../../components/AllBooks";
import { Footer } from "../../components/Footer";
import axiosClient from "../../config/axiosClient";
import './styles.css';
import validateToken from "../../utils/validateToken";
import { useNavigate } from "react-router-dom";

export const BooksCatalog = () => {
    const [auth, setAuth] = useState(false);
    const [listBooks, setListBooks] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            axiosClient.get("getAllBooks")
                .then((res) => {
                    setListBooks(res.data);
                });
        } else {
            validateToken()
                .then(() => setAuth(true))
                .catch(() => navigate("/"))
        };
    }, [auth, navigate]);

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