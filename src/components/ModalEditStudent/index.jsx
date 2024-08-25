import { useState, useEffect } from "react";
import { SvgClose } from "../Icons/close";
import { Input } from "../Input";
import { Label } from "../Label";
import { Select } from "../Select";
import { Option } from "../Option";
import { Button } from "../Button";
import Axios from "axios";
import './styles.css';

export const ModalStudent = ({ openEditStudent, id_student, defaultNameStudent, defaultEmail, close }) => {

    const [editStudentValues, setEditStudentValues] = useState({
        id_student: id_student,
        nameStudent: defaultNameStudent,
        email: defaultEmail,
    });
    const [listStudents, setListStudents] = useState();
    const [listGroups, setListGroups] = useState();

    useEffect(() => {
        Axios.get("http://localhost:3001/getStudents")
            .then((response) => {
                setListStudents(response.data);
            });

        Axios.get("http://localhost:3001/getGroups")
            .then((response) => {
                setListGroups(response.data)
            });
        },
    []);

    const handleChangeStudentValues = (value) => {
        setEditStudentValues((prevValue) => ({
            ...prevValue,
            [value.target.id]: value.target.value
        }));
    }

    const handleClickEditStudent = () => {
        Axios.put("http://localhost:3001/editStudent", {
            student_id: id_student,
            name_student: editStudentValues.nameStudent,
            email_student: editStudentValues.email,
            group: editStudentValues.new_group,
        });
        document.location.reload();
    }

    if (openEditStudent) {
        return (
            <div className="background-student" >
                <div id="modal-student">
                    <div className="header-student">
                        <h2>Editar Aluno: </h2>
                        <SvgClose onClick={close} />
                    </div>
                    <span className="modal-alert text-danger">Atenção: Nas opções para escolher, não esqueça de selecionar o dado atual caso não for alterá-lo.</span><br />
                    <Input id={id_student}
                        type={"hidden"}
                        onChange={handleChangeStudentValues}
                    />

                    <Label text={"Novo nome do aluno: "}></Label>
                    <Input id={"nameStudent"}
                        defaultValue={defaultNameStudent}
                        onChange={handleChangeStudentValues}
                    />

                    <Label text={"Novo email do aluno:"} />
                    <Input id={"email"}
                        type={"email"}
                        defaultValue={defaultEmail}
                        onChange={handleChangeStudentValues}
                    />
                    <Label text={"Nova turma do aluno:"} />
                    <Select id={"new_group"}
                        firstOption={"Escolha a nova ou a atual turma do aluno:"}
                        onChange={handleChangeStudentValues}
                        render={typeof listGroups !== "undefined" && listGroups.map((valueGen) => {
                            return (
                                <Option key={valueGen.id_turma} value={valueGen.id_turma}
                                    text={valueGen.nome_turma}
                                ></Option>
                            )
                        })}
                    ></Select>

                    <br />
                    <Button text={"Editar"}
                        className={"btn btn-info text-white"}
                        onClick={() => handleClickEditStudent()}></Button>
                </div>
            </div>
        )
    }
} 