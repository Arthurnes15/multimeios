import './styles.css';

export const Button = ({type, className, onClick, text, disabled}) => {
    return (
        <button type={type} className={className} onClick={onClick} disabled={disabled}> {text} </button>
    )
}