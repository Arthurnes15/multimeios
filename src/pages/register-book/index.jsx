import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object, string } from 'yup';
import { useForm, Controller } from "react-hook-form";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

import womanfloat from '../../assets/img/Bibliophile.gif';
import { ModalAuthor } from '../../components/ModalRegisterAuthor';
import { Spinner } from '../../components/Spinner';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Label } from '../../components/Label';
import { Input } from '../../components/Input';
import { TextRegister } from '../../components/TextRegister';
import { Button } from '../../components/Button/index';
import { ModalPublisher } from '../../components/ModalRegisterPublisher';
import validateToken from '../../utils/validateToken';
import axiosClient from '../../config/axiosClient';
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../vars/vars.css';
import './styles.css';

export function RegisterBook() {
  const schema = object({
    book: string().required("Campo obrigatório").max(255),
    author: number().required("Campo obrigatório"),
    gender: number().required("Campo obrigatório"),
    publisher: number().required("Campo obrigatório"),
    isbn: string().required("Campo obrigatório").min(10, "A quantidade mínima do ISBN é de 10 caracteres, sem traços").max(13, "O ISBN deve conter no máximo 13 caracteres, sem traços"),
    amount: number().typeError("Deve ser um número").required("Campo obrigatório"),
    volume: number().typeError("Deve ser um número"),
    cdd: string(),
    publication: string().required("Campo obrigatório").max(4, "A data deve ter no máximo 4 caracteres"),
  });
  const [auth, setAuth] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [listAuthors, setListAuthors] = useState([]);
  const [listGenders, setListGenders] = useState([]);
  const [listPublishers, setListPubli] = useState([]);
  const [openPublisher, setOpenPublisher] = useState(false);
  const [openAuthor, setOpenAuthor] = useState(false);
  const [imgURL, setImgUpload] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleUploadImg = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
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

  const handleSubmitRegister = (data) => {
    const question = window.confirm("Você tem certeza que deseja cadastrar esse livro?");
    if (question) {
      axiosClient.post("registerBook", {
        book: data.book,
        author: data.author,
        gender: data.gender,
        publisher: data.publisher,
        isbn: data.isbn,
        amount: data.amount,
        volume: data.volume,
        cdd: data.cdd,
        publication: data.publication,
        image: imgURL,
      })
      .then(() => {
        document.location.reload();
      })
      .catch(() => alert("Erro ao cadastrar livro"));
    }
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

  useEffect(() => {
    axiosClient.get("getAuthors")
      .then((response) => {
        setListAuthors(response.data)
      }
      );

    axiosClient.get("getGenders")
      .then((response) => {
        setListGenders(response.data)
      }
      );

    axiosClient.get("getPublishers")
      .then((response) => {
        setListPubli(response.data)
      }
      );
  }, []);

  useEffect(() => {
    validateToken()
      .then(() => setAuth(true))
      .catch(() => navigate('/'))
  }, [auth, navigate]);

  return (
    <>
      {!auth && <Spinner />}

      <ModalPublisher open={openPublisher}
        close={() => setOpenPublisher(false)}

      />

      <ModalAuthor open={openAuthor}
        close={() => setOpenAuthor(false)}

      />

      <Navbar />

      <article className="container-registerBook">
        <section className="left-register">
          <img src={womanfloat} className="img-register" alt="" />
        </section>

        <section className="formRegister">
          <h1>Cadastro de livros</h1>

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

          <form onSubmit={handleSubmit(handleSubmitRegister)}>
            <Input type={"hidden"}
              name={imgURL}

            />
            <div className="text-field">
              <Label htmlFor={"name_book"}
                text={'Livro'} />
              <input
                type="text"
                className="form-control"
                placeholder="Nome do Livro"
                {...register("book")}
              />
              <span className='text-danger'>{errors?.book?.message}</span>
            </div>
            <div className="row">
              <div className="col-sm">
                <Label htmlFor={"name_author"}
                  text={'Autor'} />

                <Controller
                  control={control}
                  name='author'
                  render={({
                    field: { onChange }
                  }) => (
                    <Select
                      options={authors}
                      onChange={(e) => {
                        onChange(e.value);
                      }}
                      placeholder={"Selecione o autor"}
                    ></Select>
                  )}
                >
                </Controller>
                <span className='text-danger'>{errors?.author?.message}</span>

                <TextRegister text={'Autor não listado'}
                  onClick={() => setOpenAuthor(true)} />
              </div>
              <div className="col-sm">
                <Label htmlFor={"gender"} text={"Gênero:"}></Label>

                <Controller
                  control={control}
                  name='gender'
                  render={({
                    field: { onChange }
                  }) => (
                    <Select
                      options={genders}
                      onChange={(e) => {
                        onChange(e.value);
                      }}
                      placeholder={"Selecione o gênero"}
                    ></Select>
                  )}
                >
                </Controller>
                <span className='text-danger'>{errors?.gender?.message}</span>
              </div>
              <div className="col-sm">
                <Label htmlFor={"publisher"} text={"Editora:"}></Label>

                <Controller
                  control={control}
                  name='publisher'
                  render={({
                    field: { onChange }
                  }) => (
                    <Select
                      options={publishers}
                      onChange={(e) => {
                        onChange(e.value);
                      }}
                      placeholder={"Selecione a editora"}
                    ></Select>
                  )}
                >
                </Controller>
                <span className='text-danger'>{errors?.publisher?.message}</span>

                <TextRegister text={'Editora não listada'} onClick={() => setOpenPublisher(true)}></TextRegister>
              </div>
            </div>
            <div className="text-field">
              <Label htmlFor={"isbn"} text={"ISBN:"} />
              <input type="text"
                className="form-control"
                placeholder="Nome do livro"
                {...register("isbn")} />
              <span className='text-danger'>{errors?.isbn?.message}</span>
            </div>
            <div className="text-field">
              <Label htmlFor={"amount"} text={"Nº de Exemplares:"} />
              <input type="number"
                className="form-control"
                placeholder="Nº de Exemplares"
                {...register("amount")}
              />
              <span className='text-danger'>{errors?.amount?.message}</span>
            </div>
            <div className="row">
              <div className="col-sm text-field">
                <Label htmlFor={"volume"} text={"Volume:"} />
                <input type="text"
                  className="form-control"
                  placeholder="Volume do livro"
                  {...register("volume")}
                />
              </div>
              <div className="col-sm text-field">
                <Label htmlFor={"cdd"} text={"Código: "} />
                <input type="text"
                  className="form-control"
                  placeholder="Código do livro"
                  {...register("cdd")}
                />
                <span className='text-danger'>{errors?.cdd?.message}</span>
              </div>
              <div className="col-sm text-field">
                <Label htmlFor={"date"} text={"Data: "} />
                <input type="text"
                  className="form-control"
                  placeholder="Ano do livro"
                  {...register("publication")}
                />
                <span className='text-danger'>{errors?.publication?.message}</span>
              </div>
            </div>
            <div className="btn-registerBook">
              <Button type={"submit"}
                text={"Cadastrar"}
              />
            </div>
          </form>
        </section>
      </article>
      <Footer />
    </>
  );
}