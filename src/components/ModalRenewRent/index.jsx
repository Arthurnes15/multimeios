import { useState } from "react";
import { Label } from "../Label";
import { Input } from "../Input";
import { Button } from "../Button";
import { BsXCircle } from "react-icons/bs";
import axiosClient from "../../config/axiosClient";
import './styles.css'

export const ModalRenewRent = ({ id_rent, open, close }) => {
    const [values, setValues] = useState();

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };

    const handleUpdateDateReturn = () => {
        axiosClient.put("editDateRent", {
            rent_id: id_rent,
            date_return: values.date_return
        })
        .then(() => document.location.reload())
        .catch(() => alert("Erro ao editar renovar aluguel"))
    };

    if (open) {
        return (
            <div className="background-edit" >
                <div id="modal-edit">
                    <div className="header-edit">
                        <h2>Renovar livro</h2>
                        <BsXCircle size={40} className="text-danger" onClick={close} />
                    </div>
                    <Input name={id_rent}
                        type={"hidden"}
                        onChange={handleChangeValues}
                    />

                    <Label text={"Nova data de devolução:"} />
                    <Input name={"date_return"}
                        type={"date"}
                        onChange={handleChangeValues}
                    />
                    <br />
                    <Button text={"Renovar"}
                        className={"btn btn-info text-white"}
                        onClick={() => handleUpdateDateReturn()}></Button>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}