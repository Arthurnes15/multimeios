import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import { Navbar } from '../../components/Navbar';
import { Label } from '../../components/Label/index';
import { Input }  from '../../components/Input/index';
import { Button } from '../../components/Button/index'
import { Select } from '../../components/Select/index';
import { Option } from '../../components/Option';
import Axios from 'axios';

export function RegisterStudent() {
  const [values, setValues] = useState();
  const [listGroups, setListGroups] = useState();

  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name] : value.target.value,
    }))
  };

  const handleClickButton = () => {
    const question = window.confirm("Você tem certeza que deseja cadastrar esse aluno?");
    if (question) {
      Axios.post("http://localhost:3001/register-student", {
        name : values.name_student,
        email : values.email,
        group : values.group,
      })
      document.location.reload();
    }; 
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getGroups")
    .then((response) => {
      setListGroups(response.data)}
    )}, []);

  return (
    <>
      <Navbar/>
      <article className="container">
        <h1>Cadastro de alunos</h1>

        <Label htmlFor={"book-name"}
        text={"Nome do aluno:"}
        />

        <Input name={"name_student"}
        placeholder={"Nome do aluno"}
        onChange={handleChangeValues}
        />

        <Label htmlFor={"author-name"}
        text={"E-mail:"}
        />

        <Input name={"email"}
        type={"email"}
        placeholder={"Email do aluno"}
        onChange={handleChangeValues}
        />

        <Label htmlFor={"group"}
        text={"Turma:"}
        />
        
        <Select name={"group"} onChange={handleChangeValues} firstOption={"Escolha a turma"}
          render={typeof listGroups !== "undefined" && listGroups.map((valueGroup) => {
            return(
              <Option key={valueGroup.id_turma} value={valueGroup.id_turma} text={valueGroup.nome_turma}
              ></Option>
            )
          })}
        ></Select>

        <br/>
        <Button text={"Cadastrar aluno"}
        type={"button"}
        className={"btn btn-primary"}
        onClick={() => {handleClickButton()}}
        ></Button>

      </article>
    </>
  );
}