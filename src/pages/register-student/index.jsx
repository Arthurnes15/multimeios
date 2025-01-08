import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Label } from '../../components/Label/index';
import { Button } from '../../components/Button/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { string, number, object } from 'yup';
import axiosClient from '../../config/axiosClient';
import students from '../../assets/img/students.gif';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import validateToken from '../../utils/validateToken.js';
import { Spinner } from '../../components/Spinner/index.jsx';

export function RegisterStudent() {
  const schema = object({
    name_student: string().required("Campo obrigatório").max(255),
    email: string().email("Inclua o @ no endereço de e-mail").required("Campo obrigatório"),
    group: number().required("Campo obrigatório")
  })
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [listGroups, setListGroups] = useState([]);

  const groups = typeof listGroups !== "undefined" && listGroups.map((group) => ({
    value: group.id_turma,
    label: group.nome_turma
  }));

  const handleSubmitStudent = (data) => {
    const question = window.confirm("Você tem certeza que deseja cadastrar esse aluno?");
    if (question) {
      axiosClient.post("registerStudent", {
        name: data.name_student,
        email: data.email,
        group: data.group,
      })
      .then(() => {
        document.location.reload();
      })
      .catch(() => alert("Erro ao cadastrar estudante"));
    };
  };

  useEffect(() => {
    axiosClient.get("getGroups")
      .then((response) => {
        setListGroups(response.data)
      })
  }, []);

  useEffect(() => {
    validateToken()
      .then(() => setAuth(true))
      .catch(() => navigate('/'))
  }, [auth, navigate]);

  return (
    <>
      {!auth && <Spinner/>}

      <Navbar />
      <article className="container registerStudents">
        <section className="formRegisterStudent">
          <h1>Cadastro de alunos</h1>

          <form onSubmit={handleSubmit(handleSubmitStudent)}>
            <div className="text-fieldGroup">
              <Label htmlFor={"student-name"}
                text={"Nome do aluno:"}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Nome do aluno"
                {...register("name_student")}
              />
              <span className='text-danger'>{errors?.name_student?.message}</span>
            </div>
            <div className="text-fieldGroup">
              <Label htmlFor={"email"}
                text={"E-mail:"}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Email do aluno"
                {...register("email")}
              />
              <span className='text-danger'>{errors?.email?.message}</span>
            </div>
            <div className="text-fieldGroup">
              <Label htmlFor={"group"}
                text={"Turma:"}
              />
              <Controller
                control={control}
                name='group'
                render={({
                  field: { onChange }
                }) => (
                  <Select
                    options={groups}
                    onChange={(e) => {
                      onChange(e.value);
                    }}
                    placeholder={"Selecione a turma"}
                  ></Select>
                )}
              >
              </Controller>
              <span className='text-danger'>{errors?.group?.message}</span>
            </div>
            
            <div className="btn-registerStudent">
              <Button text={"Cadastrar aluno"}
                type={"submit"}
              ></Button>
            </div>
          </form>
        </section>
        <section className="students-image">
          <img src={students} alt="students" />
        </section>
      </article>
    </>
  );
}