import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { BsXCircle } from 'react-icons/bs';
import { Label } from '../Label';
import { Button } from '../Button';
import axiosClient from '../../config/axiosClient';
import './styles.css';

export const ModalPublisher = ({ open, close }) => {
    const schema = object({
        new_publisher: string().required("Campo obrigatório").max(50, "Você atingiu o máximo de caracteres")
    });

    const{ register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleRegisterPublisher = (data) => {
        axiosClient.post("registerPublisher", {
            new_publisher: data.new_publisher
        })
        .then(() => {
            document.location.reload();
        })
        .catch(() => alert("Erro ao registrar editora"));
    }

    if (open) {
            return (
                <div className="background-publisher" >
                    <div id="modal-publisher">
                        <div className="header-publisher">
                            <h2>Cadastrar Editora</h2>
                            <BsXCircle size={40} className="text-danger"  onClick={close} />
                        </div>

                        <form onSubmit={handleSubmit(handleRegisterPublisher)}>
                            <Label text={"Nova editora:"} />
                            <input type="text"
                            className='form-control'
                            {...register("new_publisher")}
                            />
                            <span className='text-danger'>{errors?.new_publisher?.message}</span>
                            <br />
                            <Button  type="submit"
                                text={"Cadastrar"}
                                className={"btn text-white publisher"}
                            ></Button>
                        </form>
                    </div>
                </div>
            )
        } else {
            return <></>
        }
}