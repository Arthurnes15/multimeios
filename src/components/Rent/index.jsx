import './styles.css';
import { Select } from '../Select';
import { useEffect, useState } from 'react';
import { Option } from '../Option';
import { SvgUpdate } from '../Icons/update';
import { SvgTrash } from '../Icons/trash';
import Axios from 'axios';  

export const Rent = ({idRent, classRent, nameBook, nameStudent, imgRented, groupStudent, dateRent, dateReturn, statusRent, responsible }) => {
    const [values, setValues] = useState();
    const [listStatus, setListStatus] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/getStatus")
        .then((response) => {
            setListStatus(response.data)
        });
    }, []);

    const handleChangeValues = (value) => {
        setValues(prevValue => ({
          ...prevValue,
          [value.target.name] : value.target.value,
        }));
    };

    const handleUpdateStatus = () => {
        Axios.put("http://localhost:3001/editStatus", {
            status_id: values.status,
            rent_id: idRent,
        });
    };

    const handleDeleteRent = () => {
        const question = window.confirm("Você tem certeza que deseja excluir esse aluguel?");
        if (question) {
            Axios.delete(`http://localhost:3001/deleteRent/${idRent}`)
            .then(() => document.location.reload());
            
        }
    }

    return (
        <div className={classRent}>
                <div className="book-rented">
                    <img src={imgRented} alt={nameBook} className="img-rent" />
                </div>
                <div className="details-rent">
                    <div className="title-book">
                        <h4>{nameBook}</h4>
                    </div>
                    <div className="texts-rent">
                        <p>Alugatório: {nameStudent}</p>
                        <p>Turma: {groupStudent}</p>
                        <p>Distribuição: {dateRent}</p>
                        <p>Devolução: {dateReturn}</p>
                        <p>Responsável: {responsible}</p>
                    </div>
                            
                    <div className="status-renew">
                        <div className="status-rent">
                            <Select id={"select-status"} name={"status"} firstOption={"Status "} onChange={handleChangeValues} render={typeof listStatus !== "undefined" && listStatus.map(status => {
                                return(
                                    <Option key={status.id_status}
                                    value={status.id_status}
                                    text={status.tipo}
                                    ></Option>
                                )
                            })}></Select>
                            <SvgUpdate onClick={handleUpdateStatus}/>
                            <SvgTrash onClick={handleDeleteRent}/>
                        </div>
                        <div className="renew-book">
                            <span className="text-renew">Renovar livro</span>
                        </div>
                    </div>
                </div>
        </div>
    )
}