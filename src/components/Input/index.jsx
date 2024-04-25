export const Input = ({ name, type, placeholder, onChange, value }) => {
    return(
        <input className={"form-control"} name={name} type={type} placeholder={placeholder} aria-label="default input example" value={value} onChange={onChange}></input>
    )
}