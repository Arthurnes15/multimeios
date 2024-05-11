export const Input = ({ name, type, defaultValue, placeholder, onChange, value, readOnly }) => {
    return(
        <input className={"form-control"} name={name} type={type} placeholder={placeholder} aria-label="default input example" value={value} onChange={onChange} defaultValue={defaultValue} readOnly={readOnly}></input>
    )
}