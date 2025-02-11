import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { ModalStudent } from "../ModalEditStudent";
import { BsPerson } from "react-icons/bs";

import axiosClient from "../../config/axiosClient";
import './styles.css'

export const Student = ({ id_student, nameStudent, email, group, phoneNumber, idGroup }) => {
    const [openModalStudent, setOpenModalStudent] = useState(false);

    const handleDeleteStudent = () => {
        const question = window.confirm("Você tem certeza que deseja apagar esse aluno?");
        if (question === true) {
            axiosClient.delete(`deleteStudent/${id_student}`)
                .then(() => {
                    document.location.reload();
                });
        }
    };

    return (
        <>
            <ModalStudent openEditStudent={openModalStudent}
                close={() => setOpenModalStudent(false)}
                id_student={id_student}
                defaultNameStudent={nameStudent}
                defaultEmail={email}
                defaultGroup={idGroup}
                defaultPhoneNumber={phoneNumber}
            />

            <div className={`student ${group}`}>
                <h4><BsPerson size={30} />{nameStudent}</h4>
                <p className="group-student">{group}</p>
                <div className="icons-students">
                    <BsPencilSquare size={24} className="text-info" onClick={() => setOpenModalStudent(true)} />
                    <BsTrash3 size={24} className="text-danger" onClick={() => { handleDeleteStudent() }} />
                </div>
            </div>
        </>
    );
}