import './styles.css';
import { Select } from '../Select';
import { useEffect, useState } from 'react';
import { Option } from '../Option';
import { BsArrowClockwise } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';
import { ModalRenewRent } from '../ModalRenewRent';  
import axiosClient from '../../config/axiosClient';

export const Rent = ({ idRent, classRent, nameBook, nameStudent, imgRented, groupStudent, dateRent, dateReturn, statusRent, responsible }) => {
    const [values, setValues] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [listStatus, setListStatus] = useState([]);

    useEffect(() => {
        axiosClient.get("getStatus")
        .then((response) => {
            setListStatus(response.data)
        });
    }, []);

    // useEffect(() => {
    //     if (dayCurrent > getDayDate(dateReturn)) {
    //         axiosClient.put("editStatus", {
    //             status_id: 2,
    //             rent_id: idRent
    //         });
    //     }
    // });

    const handleChangeValues = (value) => {
        setValues(prevValue => ({
          ...prevValue,
          [value.target.name] : value.target.value,
        }));
    };

    const handleUpdateStatus = () => {
        axiosClient.put("editStatus", {
            status_id: values.status,
            rent_id: idRent
        })
        .then(() => document.location.reload())
        .catch(() => alert("Falha ao alterar status do aluguel."))
    };

    const handleDeleteRent = () => {
        const question = window.confirm("Você tem certeza que deseja excluir esse aluguel?");
        if (question) {
            axiosClient.delete(`deleteRent/${idRent}`)
            .then(() => document.location.reload());
        }
    }
    
    return (
            <>
                <ModalRenewRent open={openModal}
                close={() => setOpenModal(false)}
                id_rent={ idRent }
                date_return={ dateReturn }
                />
                        <div className={ classRent }>
                    <div className="book-rented">
                        <img src={ imgRented } alt={ nameBook } className="img-rent" />
                    </div>
                    <div className="details-rent">
                        <div className="title-book">
                            <h4>{ nameBook }</h4>
                        </div>
                        <div className="texts-rent">
                            <p>Alugatório: { nameStudent }</p>
                            <p>Turma: { groupStudent }</p>
                            <p>Distribuição: { dateRent }</p>
                            <p>Devolução: { dateReturn }</p>
                            <p>Responsável: { responsible }</p>
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
                                <BsArrowClockwise size={24} className="text-dark-info" onClick={handleUpdateStatus}/>
                                <BsTrash3 size={24} className="text-danger" onClick={handleDeleteRent} />
                            </div>
                            <div className="renew-book">
                                <span className="text-renew" onClick={() => setOpenModal(true)}>Renovar livro</span>
                            </div>
                        </div>
                    </div>
                    </div>
            </>
    )
}