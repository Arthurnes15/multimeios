import { useState, useEffect } from "react";
import { SvgClose } from "../Icons/close";
import { Label } from "../Label";
import { Button } from "../Button";
import Select from "react-select";
import Axios from "axios";
import './styles.css';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { number, object, string } from "yup";

export const ModalStudent = ({ openEditStudent, id_student, defaultNameStudent, defaultEmail, defaultGroup, close }) => {
    const schema = object({
        id_student: number(),
        new_name: string(),
        new_email: string().email("Inclua o @ no endereço de email"),
        new_group: string()
    })
    const {register, handleSubmit, control, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    })
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

    const handleSubmitEditStudent = (data) => {
        Axios.put("http://localhost:3001/editStudent", {
            id: data.id_student,
            name: data.new_name,
            email: data.new_email,
            group: data.new_group,
        });
        document.location.reload();
    }

    const groups = typeof listGroups !== "undefined" && listGroups.map((group) => ({
        value: group.id_turma,
        label: group.nome_turma
      }));  

    if (openEditStudent) {
        return (
            <div className="background-student" >
                <div id="modal-student">
                    <div className="header-student">
                        <h2>Editar Aluno: </h2>
                        <SvgClose onClick={close} />
                    </div>
                    
                    <form onSubmit={handleSubmit(handleSubmitEditStudent)}>
                        <input defaultValue={id_student}
                            type={"hidden"}
                            {...register("id_student")}
                        />
                        <Label text={"Novo nome do aluno: "}></Label>
                        <input type="text"
                            className="form-control"
                            defaultValue={defaultNameStudent}
                            {...register("new_name")}
                        />
                        <span className='text-danger'>{errors?.new_name?.message}</span>

                        <Label text={"Novo email do aluno:"} />
                        <input type={"email"}
                            className="form-control"
                            defaultValue={defaultEmail}
                            {...register("new_email")}
                        
                        />
                        <span className='text-danger'>{errors?.new_email?.message}</span>

                        <Label text={"Nova turma do aluno:"} />
                        <Controller 
                            control={control}
                            defaultValue={defaultGroup}
                            name="new_group"
                            render={({
                                field: {onChange}
                            }) => (
                                <Select options={groups}
                                defaultValue={groups[defaultGroup - 1]}
                                onChange={(e) => {
                                    onChange(e.value);
                                }}
                                placeholder={"Selecione a nova turma"}
                                ></Select>
                            )}
                        >
                        </Controller>
                        <span className='text-danger'>{errors?.new_group?.message}</span>

                        <br />
                        <Button type={"submit"}
                            text={"Editar"}
                            className={"btn btn-info text-white"}
                        />
                    </form>
                </div>
            </div>
        )
    }
} 