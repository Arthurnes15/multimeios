import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import { Navbar } from '../../components/Navbar';
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
    if (question === true) {
      Axios.post("http://localhost:3001/register-student", {
        name : values.name_student,
        email : values.email,
        group : values.group,
      })
      .then(() => {
        document.location.reload();
      });
    }; 
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getGroups")
    .then((response) => {
      setListGroups(response.data)}
    )}, []);

  return (
    <>
    <Navbar/>
    <div className="container">
      <h1>Cadastro de alunos</h1>
      <label htmlFor="book-name" className="form-label">Nome do aluno: </label>

      <input className="form-control" name="name_student" type="text" placeholder="Nome do aluno" aria-label="default input example" onChange={handleChangeValues}></input>

      <label htmlFor="author-name" className="form-label">E-mail: </label>
      <input className="form-control" name="email" type="email" placeholder="Email do aluno" aria-label="default input example" onChange={handleChangeValues}></input>

      <label htmlFor="gender" className="form-label">Turma: </label>
      
      <Select name={"group"} onChange={handleChangeValues} firstOption={"Escolha a turma"}
        render={typeof listGroups !== "undefined" && listGroups.map((valueGroup) => {
          return(
            <Option key={valueGroup.id_turma} value={valueGroup.id_turma} text={valueGroup.nome_turma}
            ></Option>
          )
        })}
      ></Select>

      <br/>
      
      <button type="button" className="btn btn-primary" onClick={() => {handleClickButton()}}>Cadastrar aluno</button>
    </div>
    </>
  );
}