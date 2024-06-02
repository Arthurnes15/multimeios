import { SvgTrash } from "../Icons/trash";
import { SvgEdit } from "../Icons/edit";
import Axios from 'axios';

export const Student = ({id, nameStudent, email, group }) => {
    const handleDeleteStudent = () => {
        const question = window.confirm("Você tem certeza que deseja apagar esse livro?");
        if(question === true) {
            Axios.delete(`http://localhost:3001/deleteStudent/${id}`)
            .then(() => {
                document.location.reload();
            });    
        }
    };

    return (
            <tr>
                <th scope="row">{ id }</th>
                <td>{ nameStudent }</td>
                <td>{ email }</td>
                <td>{ group }</td>
                <td><SvgEdit></SvgEdit></td>
                <td><SvgTrash onClick={() => { handleDeleteStudent()}}></SvgTrash></td>
            </tr>
    );
}