import { useNavigate } from 'react-router-dom';
import bookgif from '../../assets/img/bookgif.gif'
import './styles.css';

export const Error = () => {

  const redirect = useNavigate();

  const handleClickBack = () => {
    redirect("/home");
  }

  return(
    <div className="error-page">
      <div className="gif">
        <img src={bookgif} className="book-gif" alt="Empty Book" />
      </div>
      <span>A página que você busca aparentemente não existe :( </span>
      <div className="button-back">
        <button className="button" onClick={handleClickBack}>Voltar</button>
      </div>
    </div>
  );
}