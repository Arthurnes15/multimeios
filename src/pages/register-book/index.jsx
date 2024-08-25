import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import '../../vars/vars.css';
import './styles.css';
import Axios from 'axios';
import womanfloat from '../../assets/img/Bibliophile.gif';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Label } from '../../components/Label';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { TextRegister } from '../../components/TextRegister';
import { Button } from '../../components/Button/index';
import { Option } from '../../components/Option';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
      [value.target.name]: value.target.value,
    }))
  }

  const handleClickButton = () => {
    const question = window.confirm("Você tem certeza que quer cadastrar esse livro?");
    if (question) {
      Axios.post("http://localhost:3001/register-book", {
        book: values.book,
        author_book: values.author,
        gender: values.gender,
        publisher: values.publisher,
        isbn_book: values.isbn,
        amount: values.amount,
        volume: values.volume,
        cdd: values.cdd,
        publication: values.publication,
        image: imgURL,
      })
      document.location.reload();
    }

  }

  const handleClickButtonAut = () => {
    Axios.post("http://localhost:3001/register-author", {
      reg_author: values.reg_author
    })
      .then(response => console.log(response))
  }

  const handleClickButtonPub = () => {
    Axios.post("http://localhost:3001/register-publisher", {
      reg_pub: values.reg_pub
    })
      .then(response => console.log(response))
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getAuthors")
      .then((response) => {
        setListAuthors(response.data)
      }
      );

    Axios.get("http://localhost:3001/getGenders")
      .then((response) => {
        setListGenders(response.data)
      }
      );

    Axios.get("http://localhost:3001/getPublishers")
      .then((response) => {
        setListPubli(response.data)
      }
      );
  }, []);

  return (
    <>
      <Navbar />

      <article className="container-registerBook">
        <section className="img-register">
          <img src={womanfloat} alt="" />
        </section>
        <section className="container formRegister">
          <h1>Cadastro de livros</h1>
          <Input name={imgURL} type={"hidden"}
            onChange={handleChangeValues}
          />
          <div className="text-field">
            <Label htmlFor={"name_book"}
              text={'Livro'} />
            <Input name={"book"}
              type={"text"}
              placeholder={"Nome do livro"}
              onChange={handleChangeValues}
              maxLength={150}
            />
          </div>
          <div className="row">
            <div className="col-sm">
              <Label htmlFor={"name_author"}
                text={'Autor'} />
              <Select name={"author"}
                onChange={handleChangeValues}
                firstOption={"Escolha o autor"}
                render={typeof listAuthors !== "undefined" && listAuthors.map((author) => {
                  return (
                    <Option key={author.id_autor} value={author.id_autor} text={author.nome_autor}
                    ></Option>
                  )
                })}
              ></Select>
              <TextRegister text={'O Autor não listado'}
                onClick={() => handleRegisterAut()} />
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
            </div>
          
            <div className="col-sm">
              <Label htmlFor={"gender"} text={"Gênero:"}></Label>
              <Select name={"gender"} onChange={handleChangeValues} firstOption={"Escolha o gênero"}
                render={typeof listGenders !== "undefined" && listGenders.map((gender) => {
                  return (
                    <Option key={gender.id_genero} value={gender.id_genero} text={gender.genero}
                    ></Option>
                  )
                })}
              ></Select>
            </div>
            <div className="col-sm">
              <Label htmlFor={"publisher"} text={"Editora:"}></Label>
              <Select name={"publisher"} 
              onChange={handleChangeValues} 
              firstOption={"Escolha a editora"}
                render={typeof listPublishers !== "undefined" && listPublishers.map((pub) => {
                  return (
                    <Option key={pub.id_editora} value={pub.id_editora} text={pub.editora}
                    ></Option>
                  )
                })}
              ></Select>
              <TextRegister text={'A editora não listada'} onClick={() => handleRegisterPub()}></TextRegister>
              <div id="register-pub" style={{ display: regDivPubOpen ? "flex" : "none" }}>
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
            </div>
          </div>
          <div className="text-field">
            <Label htmlFor={"isbn"} text={"ISBN:"} />
            <Input name={"isbn"}
              type={"text"}
              placeholder={"ISBN"}
              onChange={handleChangeValues}
              maxLength={13}
              minLength={10}
            />
          </div>
          <div className="text-field">
            <Label htmlFor={"amount"} text={"Nº de Exemplares:"} />
            <Input
              name={"amount"}
              type={"number"}
              placeholder={"Número de exemplares"}
              onChange={handleChangeValues}
              min={0}
            />
          </div>
          <div className="row">
            <div className="col-sm text-field">
              <Label htmlFor={"volume"} text={"Volume:"} />
              <Input name={"volume"}
                type={"number"}
                placeholder={"Volume do livro"}
                onChange={handleChangeValues}
                min={0}
              />
            </div>
            <div className="col-sm text-field">
              <Label htmlFor={"cdd"} text={"Código do Livro:"} />
              <Input name={"cdd"}
                type={"text"}
                placeholder={"CDD"}
                onChange={handleChangeValues}
                maxLength={7}
              />
            </div>
            <div className="col-sm text-field">
              <Label htmlFor={"date"} text={"Data de publicação:"} />
              <Input name={"publication"}
                type={"text"}
                placeholder={"Data de publicação"}
                onChange={handleChangeValues}
                maxLength={4}
                min={0}

              />
            </div>
          </div>
          <div className="text-field">
            <Label htmlFor={"image_book"} text={"Imagem do livro"}></Label>
            <form onSubmit={handleUploadImg}>
              <div className="row register-image">
                <div className="col-9">
                  <Input type={"file"} />
                </div>
                <div className="col-3">
                  <Button type={"submit"}
                   text={"Enviar Foto"} />
                </div>
              </div>
              {!imgURL && <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="1000">
              <div className="progress-bar progress-bar-striped" style={{ width: progress }}></div>
              </div>}
            </form>
          </div>
          <div className="btn-registerBook">
            <Button type={"button"}
              onClick={() => handleClickButton()}
              text={"Cadastrar"}
            />
          </div>
        </section>
        
      </article>
      <Footer />
    </>
  );
}