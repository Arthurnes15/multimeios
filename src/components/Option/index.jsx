export const Option = ({ id, value, text, defaultValue, onClick}) => {
    return (
        <option id={id} value={value} defaultValue={defaultValue}>
              {text}
        </option>
    )
}