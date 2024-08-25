import { useState } from "react";
import { SvgTrash } from "../Icons/trash";
import { SvgEdit } from "../Icons/edit";
import { ModalStudent } from "../ModalEditStudent";
import Axios from 'axios';

export const Student = ({id_student, nameStudent, email, group }) => {
    const [openModalStudent, setOpenModalStudent] = useState(false);

    const handleDeleteStudent = () => {
        const question = window.confirm("Você tem certeza que deseja apagar esse livro?");
        if(question === true) {
            Axios.delete(`http://localhost:3001/deleteStudent/${id_student}`)
            .then(() => {
                document.location.reload();
            });    
        }
    };

    return (
            <>
                <ModalStudent openEditStudent={openModalStudent}
                close={() => setOpenModalStudent(false)}
                id_student={ id_student }
                defaultNameStudent={ nameStudent }
                defaultEmail={ email }                
                />
                <tr>
                    <th scope="row">{ id_student }</th>
                    <td>{ nameStudent }</td>
                    <td>{ email }</td>
                    <td>{ group }</td>
                    <td><SvgEdit onClick={() => setOpenModalStudent(true)}></SvgEdit></td>
                    <td><SvgTrash onClick={() => {handleDeleteStudent()}}></SvgTrash></td>
                </tr>
            </>
    );
}