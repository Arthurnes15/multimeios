export const Input = ({ name, id, type, defaultValue, placeholder, onChange, value, readOnly }) => {
    return(
        <input className={"form-control"} name={name} id={id} type={type} placeholder={placeholder} aria-label="default input example" value={value} onChange={onChange} defaultValue={defaultValue}></input>
    )
}