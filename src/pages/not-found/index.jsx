import { useNavigate } from 'react-router-dom';
import bookgif from '../../assets/img/bookgif.gif'
import './styles.css';

export const Error = () => {
  const redirect = useNavigate();
  const handleClickBack = () => {
    redirect("/home");
  }

  return(
      <article className="error-page">
        
        <section className="gif">
          <img src={bookgif} className="book-gif" alt="Empty Book" />
        </section>

        <span>A página que você busca aparentemente não existe :( </span>
        
        <section className="button-back">
          <button className="button" onClick={handleClickBack}>Voltar</button>
        </section>
        
      </article>
  );
}