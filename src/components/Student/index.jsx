import { useState } from "react";
import { SvgTrash } from "../Icons/trash";
import { SvgEdit } from "../Icons/edit";
import { ModalStudent } from "../ModalEditStudent";
import { SvgStudent } from "../Icons/student";
import Axios from 'axios';
import './styles.css'

export const Student = ({id_student, nameStudent, email, group, idGroup}) => {
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
                defaultGroup={ idGroup }          
                />
                
                <div className={`student ${group}`}>
                    <h4><SvgStudent/>{ nameStudent }</h4>
                    <p className="group-student">{ group }</p>
                    <div className="icons-students">
                        <SvgEdit onClick={() => setOpenModalStudent(true)}></SvgEdit>
                        <SvgTrash onClick={() => {handleDeleteStudent()}}></SvgTrash>
                    </div>
                </div>
            </>
    );
}