import './styles.css';
import { useNavigate } from 'react-router-dom';
import { string, object } from 'yup';
import imgwomen from '../../assets/img/woman-reading-bro.png';
import logo from '../../assets/img/Multimeios-Logo.png'
import axiosClient from '../../config/axiosClient';
import { Button } from '../../components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const Login = () => {
    const schema = object({
        username: string().required("Campo obrigatório").max(50),   
        password: string().required("Campo obrigatório")
    });

    const {register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const navigate = useNavigate();

    const handleSubmitLogin = (data) => {
        axiosClient.post("auth/login", {
            username: data.username,
            password: data.password,
        })
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            navigate("home");
        })
        .catch(() => alert("Você não tem permissão para acessar a página"))
    }   

    return (
        <div className="container-login">
            <div className="left">
                <img src={imgwomen} alt="Illustration" className="illustration" />
            </div>
            <div className="right">
                <div className="form-container">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1>Login</h1>

                    <form onSubmit={handleSubmit(handleSubmitLogin)}>
                        <div className="login-form-group">
                            <label htmlFor="name">Nome de usuário</label>
                            <input type="text"
                            className="form-control"
                            placeholder="Nome" 
                            {...register("username")}
                            />
                            <span className='text-danger'>{errors?.username?.message}</span>
                        </div>
                        <div className="login-form-group">
                            <label htmlFor="password">Senha:</label>
                            <input type="password"
                            className="form-control"
                            placeholder="Senha" 
                            {...register("password")}
                            />
                            <span className='text-danger'>{errors?.password?.message}</span>
                        </div>
                        <Button type={"submit"}
                        text={"Entrar"}
                        className={"btn btn-primary"}
                        />
                    </form>
                </div>
            </div>
        </div >
    )
} 