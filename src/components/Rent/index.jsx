import './styles.css';
import { Select } from '../Select';
import { useEffect, useState } from 'react';
import { Option } from '../Option';
import { SvgUpdate } from '../Icons/update';
import { dateFormatter } from '../../utils';
import Axios from 'axios';  

export const Rent = ({idRent, classRent, nameBook, nameStudent, imgRented, groupStudent, dateRent, dateReturn, statusRent }) => {
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
        }))
    };

    const handleUpdateStatus = () => {
        Axios.put("http://localhost:3001/editStatus", {
            status_id: values.status,
            rent_id: idRent,
        });
    };

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
                        <p className="text-rent">Alugatório: {nameStudent}</p>
                        <p className="text-rent">Turma: {groupStudent}</p>
                        <p className="text-rent">Distribuição: {dateRent}</p>
                        <p className="text-rent">Devolução: {dateReturn}</p>
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
                        </div>
                        <div className="renew-book">
                            <span className="text-renew">Renovar livro</span>
                        </div>
                    </div>
                </div>
        </div>
    )
}