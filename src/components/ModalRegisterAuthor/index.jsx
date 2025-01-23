import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { BsXCircle } from 'react-icons/bs';
import { Label } from '../Label';
import { Button } from '../Button';
import axiosClient from '../../config/axiosClient';
import './styles.css';

export const ModalAuthor = ({ open, close }) => {
    const schema = object({
        new_author: string().required("Campo obrigatório").max(50, "Você atingiu o máximo de caracteres")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleRegisterAuthor = (data) => {
        axiosClient.post("registerAuthor", {
            new_author: data.new_author
        })
        .then(() => {
            document.location.reload();
        })
        .catch(() => alert("Erro ao registrar autor"));
    }

    if (open) {
        return (
            <div className="background-author">
                <div id="modal-author">
                    <div className="header-author">
                        <h2>Cadastrar Autor</h2>
                        <BsXCircle size={40} className="text-danger" onClick={close} />
                    </div>

                    <form onSubmit={handleSubmit(handleRegisterAuthor)}>
                        <Label text={"Nova autor:"} />
                        <input type="text"
                            className='form-control'
                            {...register("new_author")}
                        />
                        <span className='text-danger'>{errors?.new_author?.message}</span>
                        <br />
                        <Button type="submit"
                            text={"Cadastrar"}
                            className={"btn text-white author"}
                        ></Button>
                    </form>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}