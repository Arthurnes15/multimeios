import { useState } from "react";
import { Book } from "../Book"
import book_placeholder from '../../assets/img/book-placeholder.png';
import './styles.css';

export const AllBooks = ({books = []}) => {
    const [listBooks, setListBooks] = useState([]);

    return(
        <>
            <div className="container all-books">
                {books.map(book => (
                    <Book key={book.id_livro}
                    id={book.id_livro}
                    listBook={listBooks}
                    setListBook={setListBooks}
                    nameBook={book.nome_livro}
                    nameAuthor={book.nome_autor}
                    idAuthor={book.id_autor}
                    publisher={book.editora}
                    idPublisher={book.id_editora}
                    publication={book.data_publicacao}
                    gender={book.genero}
                    idGender={book.id_genero}
                    isbn={book.ISBN}
                    cdd={book.CDD}
                    amount={book.n_exemplares}
                    volume={book.volume_livro}
                    img={book.url_imagem || book_placeholder}
                    alt={book.nome_livro} />
                ))}
            </div>
        </>
    );
};