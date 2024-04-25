export const Option = ({ id, value, text, defaultValue}) => {
    return (
        <option id={id} value={value} defaultValue={defaultValue}>
              {text}
        </option>
    )
}