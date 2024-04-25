export const Select = ({id, name, onChange, firstOption, render}) => {
    return (
        <select id={id} className="form-select" name={name} aria-label="Default select example" onChange={onChange}>
            <option value="0">{firstOption}</option>
            {render}
        </select>
    )       
}