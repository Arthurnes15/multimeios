import { useState, useEffect } from "react";
import { SvgClose } from "../Icons/close";
import { Label } from "../Label";
import { Button } from "../Button";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { number, object, string } from "yup";
import axiosClient from "../../config/axiosClient";
import './styles.css';

export const ModalStudent = ({ openEditStudent, id_student, defaultNameStudent, defaultEmail, defaultGroup, close }) => {
    const schema = object({
        id_student: number(),
        new_name: string(),
        new_email: string().email("Inclua o @ no endereço de email"),
        new_group: number()
    })
    const {register, handleSubmit, control, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    })
    const [listGroups, setListGroups] = useState();

    useEffect(() => {
        axiosClient.get("getGroups")
            .then((response) => {
                setListGroups(response.data)
            });
        },
    []);

    const handleSubmitEditStudent = (data) => {
        axiosClient.put("editStudent", {
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

                        <div className="text-fieldEditStudent">
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
                        </div>
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