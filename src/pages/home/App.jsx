import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {Navbar} from '../../components/Navbar/index';
import { Book } from '../../components/Book';

export const App = () => {
    const [listBooks, setListBooks] = useState();

    useEffect(() => {
        Axios.get("http://localhost:3001/getBooks")
        .then((response) => {
          setListBooks(response.data)}
        )
    }, [])

    return (
        <div>
            <Navbar/>
            {typeof listBooks !== "undefined" &&
            listBooks.map((value) => {
                return (
                    <Book key={value.id_livro}
                    listBook={listBooks}
                    setListBook={setListBooks}
                    nameBook={value.nome_livro}
                    nameAuthor={value.nome_autor}
                    img={value.url_imagem}
                    />
                )
            })}
        </div>

    )
}