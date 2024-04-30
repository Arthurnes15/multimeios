import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import '../../vars/vars.css';
import './styles.css';
import Axios from 'axios';
import { Navbar } from '../../components/Navbar';
import { Label } from '../../components/Label';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { TextRegister } from '../../components/TextRegister';
import { Button } from '../../components/Button/index';
import { Option } from '../../components/Option';
import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { storage } from '../../firebase';

export function RegisterBook() {
  const [values, setValues] = useState();
  const [listAuthors, setListAuthors] = useState();
  const [listGenders, setListGenders] = useState();
  const [listPublishers, setListPubli] = useState();
  const [regDivPubOpen, setPubOpen] = useState(false);
  const [regDivAutOpen, setAutOpen] = useState(false);
  const [imgURL, setImgUpload] = useState("");
  const [progress, setProgress] = useState(0);

  const handleUploadImg = (event) => {
    event.preventDefault();
    const file = event.target[0].files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 1000
        setProgress(progress);
      },
      error => {
        console.log(error)
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref)
        .then(url => {
          setImgUpload(url);
        })
      }  
    )
  }
  
  const handleRegisterPub = () => {
    setPubOpen(true);
  }

  const handleRegisterAut = () => {
    setAutOpen(true);
  }

  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name] : value.target.value,
    }))
  }

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register-book", {
      book : values.book,
      author_book : values.author,
      gender : values.gender,
      publisher : values.publisher,
      isbn : values.isbn,
      amount : values.amount,
      volume: values.volume,
      cdd : values.cdd,
      publication : values.publication,
      image : imgURL,
    })
    .then(() => {
      document.location.reload();
    })
  }

  const handleClickButtonAut = () => {
    Axios.post("http://localhost:3001/register-author", {
      reg_author : values.reg_author
    })
    .then(response => console.log(response))
  }

  const handleClickButtonPub = () => {
    Axios.post("http://localhost:3001/register-publisher", {
      reg_pub : values.reg_pub
    })
    .then(response => console.log(response))
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getAuthors")
    .then((response) => {
      setListAuthors(response.data)}
    )

    Axios.get("http://localhost:3001/getGenders")
    .then((response) => {
      setListGenders(response.data)}
    )

    Axios.get("http://localhost:3001/getPublishers")
    .then((response) => {
      setListPubli(response.data)}
    )
  }, []);

  return (
    <>
    <Navbar></Navbar>
    <div className="container">
      <h1>Cadastro de livros</h1>

      <Input name={imgURL} type={"hidden"}
      onChange={handleChangeValues}
      ></Input>
      
      <br />
      <Label htmlFor={"name_book"} text={'Livro'}></Label>

      <Input name={"book"} 
      type={"text"}
      placeholder={"Nome do livro"}
      onChange={handleChangeValues}
      ></Input>
    
      <Label htmlFor={"name_author"} text={'Autor'}></Label>
      <Select name={"author"} onChange={handleChangeValues} firstOption={"Escolha o autor"}
        render={typeof listAuthors !== "undefined" && listAuthors.map((valueAuthor) => {
            return(
              <Option key={valueAuthor.id_autor} value={valueAuthor.id_autor} text=   {valueAuthor.nome_autor}
              ></Option>
            )
        })}
      ></Select>

      <TextRegister text={'O Autor que quero cadastrar não está listado'}
      onClick={() => handleRegisterAut()}></TextRegister>
      <div id="register-author" style={{ display: regDivAutOpen ? "flex" : "none" }}>
        <div className="col">
          <Label htmlFor={"new-author"} text={"Novo autor: "}></Label>

          <Input name={"reg_author"}
          type={"text"}
          placeholder={"Nome do novo autor"}
          onChange={handleChangeValues}
          ></Input>
        </div>

        <div className="container-button">
          <Button type={"button"} onClick={() => handleClickButtonAut()} text={"Cadastrar"}></Button>
        </div>
      </div>

      <Label htmlFor={"gender"} text={"Gênero:"}></Label>
      <Select name={"gender"} onChange={handleChangeValues} firstOption={"Escolha o gênero"} 
              render={typeof listGenders !== "undefined" && listGenders.map((valueGender) => {
                return (
                  <Option key={valueGender.id_genero} value={valueGender.id_genero} text={valueGender.genero}
                  ></Option>
                )
              })}
      ></Select>

      <Label htmlFor={"publisher"} text={"Editora:"}></Label>
      <Select name={"publisher"} onChange={handleChangeValues} firstOption={"Escolha a editora"}
        render={typeof listPublishers !== "undefined" && listPublishers.map((valuePub) => {
          return(
            <Option key={valuePub.id_editora} value={valuePub.id_editora} text={valuePub.editora}
            ></Option>
          )
        })}
      ></Select>

      <TextRegister text={'A editora que quero cadastrar não está listada'}onClick={() => handleRegisterPub()}></TextRegister>

      <div id="register-pub" style={{display: regDivPubOpen ? "flex" : "none"}}>
        <div className="col">
          <Label htmlFor={"new-publisher"} text={"Cadastrar Editora:"} />
          <Input name={"reg_pub"}
          type={"text"}
          placeholder={"Nome da nova editora"}
          onChange={handleChangeValues}
          ></Input>
        </div>
        <div className="container-button">
          <Button type={"button"} onClick={() => handleClickButtonPub()} text={"Cadastrar"}></Button>
        </div>
      </div>

      <Label htmlFor={"isbn"} text={"ISBN:"}></Label>
      <Input name={"isbn"}
      type={"text"}
      placeholder={"ISBN"}
      onChange={handleChangeValues}
      ></Input>

      <Label htmlFor={"amount"} text={"Nº de Exemplares:"} />
      <Input
      name={"amount"}
      type={"number"}
      placeholder={"Número de exemplares"}
      onChange={handleChangeValues}
      ></Input>

      <Label htmlFor={"volume"} text={"Volume:"} />

      <Input name={"volume"}
      type={"number"}
      placeholder={"Volume do livro"}
      onChange={handleChangeValues}
      ></Input>

      <Label htmlFor={"cdd"} text={"Código do Livro:"} />

      <Input name={"cdd"}
      type={"text"}
      placeholder={"CDD"}
      onChange={handleChangeValues}
      ></Input>

      <Label htmlFor={"date"} text={"Data de publicação:"} />

      <Input name={"publication"}
      type={"date"}
      placeholder={"Data de publicação"}
      onChange={handleChangeValues}
      ></Input>

      <Label htmlFor={"image_book"} text={"Imagem do livro"}></Label>
      <form onSubmit={handleUploadImg}>
      <Input type={"file"}></Input>
      <br />
      <Button type={"submit"} className={"btn-registerBook"} text={"Enviar Foto"}></Button>
      {!imgURL && <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="1000">
        <div className="progress-bar" style={{width: progress}}></div>
      </div>}
      </form>
      <br/>
      
      <Button type={"button"} className={"btn-registerBook"} onClick={() => handleClickButton()} text={"Cadastrar Livro"}></Button>
    
    </div>
    </>
  );
}