import './styles.css';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import imgwomen from '../../assets/img/woman-reading-bro.png';
import logo from '../../assets/img/Multimeios-Logo.png'

export const Login = () => {
    const navigate = useNavigate();

    const handleClickLogin = (values) => {
        Axios.post("http://localhost:3001/login", {
            name: values.name,
            email: values.email,
            password: values.password,
        }).then(() => {
            navigate("home");
        }).catch(() => {
            alert("Você não tem permissão para acessar a página");
        });
    }

    const validationLogin = yup.object().shape({
        name: yup.string().required("Esse campo é obrigatório"),
        email: yup.string().email("Não é um e-mail").required("Esse campo é obrigatório"),
        password: yup.string().min(8).required("Esse campo é obrigatório"),
    });

    return(
        <div className="container-login">
        <div className="left">
            <img src={imgwomen} alt="Illustration" className="illustration" />
        </div>
        <div className="right">
            <div className="form-container">
                <img src={logo} alt="Logo" className="logo" />
                <h1>Login</h1>
                <Formik
                    initialValues={{}}
                    validationSchema={validationLogin}
                    onSubmit={handleClickLogin}
                >
                    <Form className="login-form">
                        <div className="login-form-group">
                            <label htmlFor="name">Nome de usuário</label>
                            <Field name="name" className="form-control" placeholder="Nome" />
                            <ErrorMessage component="span" name="name" className="form-error" />
                        </div>

                        <div className="login-form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" className="form-control" placeholder="Em@il" />
                            <ErrorMessage component="span" name="email" className="form-error" />
                        </div>

                        <div className="login-form-group">
                            <label htmlFor="password">Senha:</label>
                            <Field name="password" type="password" className="form-control" placeholder="Senha" />
                            <ErrorMessage component="span" name="password" className="form-error" />
                        </div>

                        <button type="submit" className="btn btn-primary">Entrar</button>
                    </Form>
                </Formik>
            </div>
        </div>
    </div>
    )
} 