import { useState } from "react";
import { Student } from "../Student";
import './styles.css';

export const Students = ({ students = [] }) => {
    const [listStudents, setListStudents] = useState([]);
    
    return (
            <section className="students">
                {students.map(student => (
                    <Student key={student.id_aluno}
                    id_student={student.id_aluno}
                    nameStudent={student.nome_aluno}
                    email={student.email_aluno}
                    idGroup={student.id_turma}
                    group={student.nome_turma}
                    phoneNumber={student.telefone_aluno}
                    listStudents={listStudents}
                    setListStudents={setListStudents}
                    />
                ))}
            </section>
    )
}