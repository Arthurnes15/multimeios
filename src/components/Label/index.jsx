export const Label = ({text, htmlFor, className}) => {
    return(
       <label htmlFor={htmlFor} className={"form-label"}>
            {text}
       </label>
    )
}