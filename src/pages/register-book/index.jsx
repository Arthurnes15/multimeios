import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../vars/vars.css';
import './styles.css';
import womanfloat from '../../assets/img/Bibliophile.gif';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Label } from '../../components/Label';
import { Input } from '../../components/Input';
import Select from 'react-select'
import { TextRegister } from '../../components/TextRegister';
import { Button } from '../../components/Button/index';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

export function RegisterBook() {
  const [values, setValues] = useState();
  const [listAuthors, setListAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [listGenders, setListGenders] = useState([]);
  const [listPublishers, setListPubli] = useState([]);
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
        author_book: selectedAuthor,
        gender: selectedGender,
        publisher: selectedPublisher,
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

  const authors = typeof listAuthors !== "undefined" && listAuthors.map((author) => ({
    value: author.id_autor,
    label: author.nome_autor,
  }));

  const genders = typeof listGenders !== "undefined" && listGenders.map((gender) => ({
    value: gender.id_genero,
    label: gender.genero,
  }));

  const publishers = typeof listPublishers !== "undefined" && listPublishers.map((publisher) => ({
    value: publisher.id_editora,
    label: publisher.editora,
  }));

  const handleChangeAuthor = (e) => {
    setSelectedAuthor(e.value);
  }

  const handleChangeGender = (e) => {
    setSelectedGender(e.value);
  }

  const handleChangePublisher = (e) => {
    setSelectedPublisher(e.value);
  }

  const selectedOptionAuthor = authors.find(
    (e) => e.value === selectedAuthor
  );

  const selectedOptionGender = genders.find(
    (e) => e.value === selectedGender
  );

  const selectedOptionPublisher = publishers.find(
    (e) => e.value === selectedPublisher
  );

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
        <section className="left-register">
          <img src={womanfloat} className="img-register" alt="" />
        </section>
        <section className="formRegister">
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
              <Select options={authors}
                value={selectedOptionAuthor}
                onChange={handleChangeAuthor}
                placeholder={"Selecione o autor"}
              ></Select>

              <TextRegister text={'Autor não listado'}
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
              <Select options={genders}
                value={selectedOptionGender}
                onChange={handleChangeGender}
                placeholder={"Selecione o gênero"}
              ></Select>

            </div>
            <div className="col-sm">
              <Label htmlFor={"publisher"} text={"Editora:"}></Label>
              <Select options={publishers}
                value={selectedOptionPublisher}
                onChange={handleChangePublisher}
                placeholder={"Selecione a editora"}
              ></Select>

              <TextRegister text={'Editora não listada'} onClick={() => handleRegisterPub()}></TextRegister>
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
              <Label htmlFor={"cdd"} text={"Código: "} />
              <Input name={"cdd"}
                type={"text"}
                placeholder={"CDD"}
                onChange={handleChangeValues}
                maxLength={7}
              />
            </div>
            <div className="col-sm text-field">
              <Label htmlFor={"date"} text={"Data: "} />
              <Input name={"publication"}
                type={"text"}
                placeholder={"Ano da publicação"}
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
                    text={"Enviar"} />
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