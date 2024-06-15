import { useState } from "react";
import { Student } from "../Student";
import './styles.css';

export const Students = ({ students = [] }) => {
    const [listStudents, setListStudents] = useState([]);
    
    return (
            <table className="container table">
                    <thead>
                        <tr>
                            <th scope="col">ID do Aluno</th>
                            <th scope="col">Nome do Aluno</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Turma/Série</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <Student key={student.id_aluno}
                            id_student={student.id_aluno}
                            nameStudent={student.nome_aluno}
                            email={student.email_aluno}
                            group={student.nome_turma}
                            listStudents={listStudents}
                            setListStudents={setListStudents}
                            />
                        ))}
                    </tbody>
            </table>
    )
}