import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { number, object, string } from "yup";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { BsXCircle } from "react-icons/bs";

import { Label } from "../Label";
import { Button } from "../Button";
import axiosClient from "../../config/axiosClient";
import validateToken from "../../utils/validateToken";
import './styles.css';

export const Modal = ({ id_book, status, open, close }) => {
    const schema = object({
        id: number(),
        student: number().required("Campo obrigatório"),
        status: number(),
        date_return: string().required(),
    });
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [responsible, setResponsible] = useState('');
    const [listStudents, setListStudents] = useState();

    const students = typeof listStudents !== "undefined" && listStudents.map((student) => ({
        value: student.id_aluno,
        label: student.nome_aluno,
    }));

    const handleSubmitRent = (data) => {
        axiosClient.post("rent", {
            book_id: data.id,
            student: data.student,
            status: data.status,
            date_return: data.date_return,
            responsible: responsible,
        })
        .then(() => {
            document.location.reload();
        })
        .catch(() => alert("Erro ao alugar livro"));
    };
    
    useEffect(() => {
        axiosClient.get("getStudents")
            .then((response) => {
                setListStudents(response.data);
            });
    }, []);

    useEffect(() => {
        validateToken()
            .then((res) => setResponsible(res.data.username))
            .catch(err => console.log(err))
    });

    if (open) {
        return (
            <div className="background" >
                <div id="modal">
                    <div className="header">
                        <h2>Aluguel de Livros</h2>
                        <BsXCircle size={40} className="text-danger" onClick={close} />
                    </div>

                    <form onSubmit={handleSubmit(handleSubmitRent)}>
                        <input
                            type="hidden"
                            className="form-control"
                            defaultValue={id_book}
                            {...register("id")}
                        />
                        <div>
                            <Label text={"Data de devolução:"} />
                            <input
                                type={"date"}
                                className="form-control"
                                {...register("date_return")}
                            />
                            <span className="text-danger">{errors?.date_return?.message}</span>
                        </div>

                        <div>
                            <Label text={"Aluno: "}></Label>
                            <Controller
                                control={control}
                                name="student"
                                render={({
                                    field: { onChange }
                                }) => (
                                    <Select
                                        options={students}
                                        onChange={(e) => {
                                            onChange(e.value);
                                        }}
                                        placeholder={"Selecione o aluno"}
                                    ></Select>
                                )}
                            />
                            <span className='text-danger'>{errors?.student?.message}</span>
                        </div>

                        <input
                            type={"hidden"}
                            className="form-control"
                            defaultValue={status}
                            {...register("status")}
                        />
                        <br />
                        <div>
                            <Button
                                type={"submit"}
                                text={"Alugar"}
                                className={"btn btn-warning"}
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}