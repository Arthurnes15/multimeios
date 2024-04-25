import './styles.css'

export const TextRegister = ({text, onClick}) => {
    return(
        <p onClick={onClick} className='text-register'>
            {text}
        </p>
    )
}