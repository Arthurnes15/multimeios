import { Label } from "../Label";
import { Input } from "../Input";
import { Select } from "../Select";
import { Option } from "../Option";
import { Button } from "../Button";
import { SvgClose } from "../Icons/close";
import './styles.css';
import { useEffect, useState } from "react";
import Axios from "axios";

export const Modal = ({ id_book, responsible, status, open, close, dateReturn }) => {
    const [values, setValues] = useState();
    const [listStudents, setListStudents] = useState();

    useEffect(() => {
        Axios.get("http://localhost:3001/getStudents")
            .then((response) => {
                setListStudents(response.data);
            }
        );
    }, []);

    const handleChangeValues = (value) => {
        setValues(prevValue => ({
          ...prevValue,
          [value.target.name] : value.target.value,
        }));
    };

    const handleClickRent = () => {
        Axios.post("http://localhost:3001/rent", {
            book_id : id_book,
            responsible_rent: values.responsible,
            student: values.student,
            status_rent: status,
            date_return: values.date_return
        });
    }

    if (open) {
        return (
            <div className="background" >
                <div id="modal">
                    <div className="header">
                        <h2>Aluguel de Livros</h2>
                        <SvgClose onClick={close}/>
                    </div>
                    <Input name={id_book}
                    type={"hidden"}
                    onChange={handleChangeValues}
                    />

                    <Label text={"Responsável pelo aluguel: "}></Label>
                    <Input name={"responsible"}
                    onChange={handleChangeValues}
                    />

                    <Label text={"Data de devolução:"}/>
                    <Input name={"date_return"}
                    type={"date"}
                    onChange={handleChangeValues}
                    />


                    <Label text={"Aluno: "}></Label>
                    <Select name={"student"}
                    firstOption={"Escolha o aluno"}
                    onChange={handleChangeValues}
                    render={typeof listStudents !== "undefined" && listStudents.map((valueStu) => {
                        return (
                            <Option key={valueStu.id_aluno} value={valueStu.id_aluno} 
                            text={valueStu.nome_aluno}
                            ></Option>
                        )
                    })}
                    ></Select>

                    <Input name={status}
                    type={"hidden"}
                    onChange={handleChangeValues}
                    />


                    <br />
                    <Button text={"Alugar"}
                    className={"btn btn-warning"}
                    onClick={() => handleClickRent()}></Button>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}