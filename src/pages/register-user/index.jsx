import { useEffect, useState } from 'react';
import { object, string } from 'yup';
import { Navbar } from '../../components/Navbar';
import { Label } from '../../components/Label/';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Footer } from '../../components/Footer';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import add_users from '../../assets/img/add_users.gif';
import axiosClient from '../../config/axiosClient';
import './styles.css';
import validateToken from '../../utils/validateToken';

export const RegisterUser = () => {
    const [auth, setAuth] = useState(false);
    const schema = object({
        username: string().required("Campo obrigatório").max(255),
        password: string().required("Campo obrigatório").min(8, "Deve ter no mínimo 8 caracteres"),
        position: string().required("Campo obrigatório")
    })
    const navigate = useNavigate();

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const options = [
        { value: 'admin', label: 'Administrador' },
        { value: 'monitor', label: 'Monitor' },
    ]

    const handleSubmitRegisterUser = (data) => {
        axiosClient.post("registerUser", {
            username: data.username,
            password: data.password,
            position: data.position,
        })
        .then(() => {
            document.location.reload();
        })
        .catch(() => alert("Erro ao cadastrar usuário"));
    }

    useEffect(() => {
        validateToken()
            .then((res) => {
                setAuth(true)
                if (res.data.position !== "admin") {
                    navigate('/home')
                }
            })
            .catch(() => navigate('/'))
    }, [auth, navigate]);

    return (
        <>
            <Navbar />
            <article className="container registerUser">
                <section className="formRegisterUser">
                    <h1>Cadastrar Usuário</h1>
                    <form onSubmit={handleSubmit(handleSubmitRegisterUser)}>
                        <div className="text-fieldUser">
                            <Label text={"Nome de Usuário: "}></Label>
                            <input type="text"
                                className="form-control"
                                {...register("username")}
                            />
                            <span className='text-danger'>{errors?.username?.message}</span>
                        </div>
                        <div className="text-fieldUser">
                            <Label text={"Senha: "}></Label>
                            <input type="password"
                                className="form-control"
                                {...register("password")}
                            />
                            <span className='text-danger'>{errors?.password?.message}</span>
                        </div>

                        <div className="text-fieldUser">
                            <Label htmlFor={"position"}
                                text={"Cargo:"}
                            />
                            <Controller
                                control={control}
                                name='position'
                                render={({
                                    field: { onChange }
                                }) => (
                                    <Select
                                        options={options}
                                        onChange={(e) => {
                                            onChange(e.value);
                                        }}
                                        placeholder={"Selecione o cargo"}
                                    ></Select>
                                )}
                            >
                            </Controller>
                            <span className='text-danger'>{errors?.position?.message}</span>
                        </div>

                        <div className="btn-registerUser">
                            <Button type={"submit"}
                                text={"Cadastrar"}
                            />
                        </div>
                    </form>
                </section>
                <section className="users-image">
                    <img src={add_users} alt="add_user" />
                </section>
            </article>
            <Footer />
        </>
    )
}