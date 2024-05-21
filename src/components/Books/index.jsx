import { useState, useEffect } from "react";
import { Book } from "../Book"
import './styles.css';

export const Books = ({books = []}) => {
    const [listBooks, setListBooks] = useState([]);

    return(
        <section className="container-books">
            <div className="books">
                {books.map(book => (
                    <Book key={book.id_livro}
                    id={book.id_livro}
                    listBook={listBooks}
                    setListBook={setListBooks}
                    nameBook={book.nome_livro}
                    nameAuthor={book.nome_autor}
                    publisher={book.editora}
                    publication={book.data_publicacao}
                    gender={book.genero}
                    isbn={book.ISBN}
                    cdd={book.CDD}
                    amount={book.n_exemplares}
                    img={book.url_imagem}
                    alt={book.nome_livro}
                    />
                ))}     
            </div>
        </section>
    )
}