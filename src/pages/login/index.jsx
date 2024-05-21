import './styles.css';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    const handleClickLogin = (values) => {
        Axios.post("http://localhost:3001/login", {
            name: values.name,
            email: values.email,
            password: values.password,
        }).then((response) => {
            if (response.data.msg === "Usuário logado") {
                navigate("home");
            } else {
                alert("Você não tem permissão para acessar a página")
            }
        });
    }

    const validationLogin = yup.object().shape({
        name: yup.string().required("Esse campo é obrigatório"),
        email: yup.string().email("Não é um e-mail").required("Esse campo é obrigatório"),
        password: yup.string().min(8).required("Esse campo é obrigatório"),
    });

    return(
        <div className="container">
            <h1>Login</h1>
            <Formik
            initialValues={{}}
            validationSchema={validationLogin}
            onSubmit={handleClickLogin}
            >
                <Form className="login-form">
                    <div className="login-form-group">
                        <label htmlFor="email">Nome de usuário</label>
                        <Field name="name" className="form-control"
                        placeholder="Nome"/>

                        <ErrorMessage 
                        component="span"
                        name="name"
                        className="form-error"
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="email">Email</label>
                        <Field name="email" className="form-control"
                        placeholder="Em@il"/>

                        <ErrorMessage 
                        component="span"
                        name="email"
                        className="form-error"
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="password">Senha:</label>
                        <Field name="password" className="form-control"
                        placeholder="Senha"/>

                        <ErrorMessage 
                        component="span"
                        name="password"
                        className="form-error"
                        />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Entrar</button>
                </Form>
            </Formik>

        </div>
    )
} 