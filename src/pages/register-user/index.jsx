import { object, string } from 'yup';
import { Label } from '../../components/Label/';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import axiosClient from '../../config/axiosClient';

export const RegisterUser = () => {
    const schema = object({
        username: string().required("Campo obrigatório").max(255),
        password: string().required("Campo obrigatório").min(8, "Deve ter no mínimo 8 caracteres"),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const handleSubmitRegisterUser = (data) => {
        axiosClient.post("registerUser", {
            username: data.username,
            password: data.password
        })
        .then(() => {
            document.location.reload();
        })
        .catch(() => alert("Algo deu errado"));
    }

    return (
        <>
            <div className='container'>
                <h1>Cadastrar Usuário</h1>
                <form onSubmit={handleSubmit(handleSubmitRegisterUser)}>
                    <Label text={"Nome de Usuário: "}></Label>
                    <input type="text"
                        className="form-control"
                        {...register("username")}
                    />
                    <span className='text-danger'>{errors?.username?.message}</span>
                    <Label text={"Senha: "}></Label>
                    <input type="password"
                        className="form-control"
                        {...register("password")}
                    />
                    <span className='text-danger'>{errors?.password?.message}</span>
                    <br />
                    <Button type={"submit"}
                        text={"Cadastrar"}
                        className={"btn btn-info"}
                    />
                </form>
            </div>
        </>
    )
}