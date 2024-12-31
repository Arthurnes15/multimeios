import { useState, useEffect } from "react";
import { SvgClose } from "../Icons/close";
import { Label } from "../Label";
import { Button } from "../Button";
import Select from "react-select";
import { number, object, string } from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "../../config/axiosClient";
import './styles.css'

export const ModalEdit = ({ openEdit, id_book, defaultName, defaultAuthor, defaultPublisher, defaultGender, defaultAmount, defaultISBN, defaultCDD, defaultVolume, close }) => {
    const schema = object({
        id_book: number(),
        new_book: string().max(255, "Você atingiu o número máximo de caracteres"),
        new_author: number(),
        new_publisher: number(),
        new_gender: number(),
        new_isbn: string().min(10, "A quantidade mínima do ISBN é de 10 caracteres, sem traços").max(13, "O ISBN deve conter no máximo 13 caracteres, sem traços"),
        new_amount: number().typeError("Deve ser um número"),
        new_cdd: string(),
        new_volume: number().typeError("Deve ser um número"),
    })
    const{ register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [listAuthors, setListAuthors] = useState();
    const [listGenders, setListGenders] = useState();
    const [listPublishers, setListPubli] = useState();

    const authors = typeof listAuthors !== "undefined" && listAuthors.map((author) => ({
        value: author.id_autor,
        label: author.nome_autor
    }));

    const publishers = typeof listPublishers !== "undefined" && listPublishers.map((publisher) => ({
        value: publisher.id_editora,
        label: publisher.editora
    }))

    const genders = typeof listGenders !== "undefined" && listGenders.map((gender) => ({
        value: gender.id_genero,
        label: gender.genero
    }))
    
    useEffect(() => {
        axiosClient.get("getAuthors")
            .then((response) => {
                setListAuthors(response.data)
            });

        axiosClient.get("getGenders")
            .then((response) => {
                setListGenders(response.data)
            });

        axiosClient.get("getPublishers")
            .then((response) => {
                setListPubli(response.data)
            });
        },
    []);
    
    const handleSubmitEdit = (data) => {
        axiosClient.put("editBook", {
            id: data.id_book,
            book: data.new_book,
            author: data.new_author,
            publisher: data.new_publisher,
            gender: data.new_gender,
            isbn: data.new_isbn,
            amount: data.new_amount,
            cdd: data.new_cdd,
            volume: data.new_volume
        });
        document.location.reload();
    };
    
    if (openEdit) {
        return (
            <div className="background-edit" >
                <div id="modal-edit">
                    <div className="header-edit">
                        <h2>Edição do Livro</h2>
                        <SvgClose onClick={close} />
                    </div>
    
                    <form onSubmit={handleSubmit(handleSubmitEdit)}>
                        <input type="hidden" 
                            defaultValue={id_book}
                            className="form-control"
                            {...register("id_book")}
                        />
                        <Label text={"Novo nome do Livro:"}></Label>
                        <input 
                            type="text"
                            className="form-control"
                            defaultValue={defaultName}
                            {...register("new_book")}
                        />
                        <span className='text-danger'>{errors?.new_book?.message}</span>
                        <div className="row">
                            <div className="col-sm">
                                <Label text={"Novo autor:"} />
                                <Controller
                                    control={control}
                                    name="new_author"
                                    defaultValue={defaultAuthor}
                                    render={({
                                        field: { onChange }
                                    }) => (
                                        <Select options={authors}
                                        defaultValue={authors[defaultAuthor - 1]}
                                        onChange={(e) => {
                                            onChange(e.value);
                                        }}
                                        placeholder={"Selecione o novo autor"}
                                        ></Select>
                                    )}>
                                </Controller>
                                <span className='text-danger'>{errors?.new_author?.message}</span>
                            </div>

                            <div className="col-sm">
                                <Label text={"Nova editora:"} />
                                <Controller
                                    control={control}
                                    name="new_publisher"
                                    defaultValue={defaultPublisher}
                                    render={({
                                        field: { onChange }
                                    }) => (
                                        <Select options={publishers}
                                        defaultValue={publishers[defaultPublisher - 1]}
                                        onChange={(e) => {
                                            onChange(e.value);
                                        }}
                                        placeholder={"Selecione a nova editora: "}
                                        ></Select>
                                    )}>
                                </Controller>
                                <span className='text-danger'>{errors?.new_publisher?.message}</span>
                            </div>
                        </div>
                        
                        <Label text={"Novo gênero:"} />
                        <Controller
                            control={control}
                            name="new_gender"
                            defaultValue={defaultGender}
                            render={({
                                field: { onChange }
                            }) => (
                                <Select options={genders}
                                defaultValue={genders[defaultGender - 1]}
                                onChange={(e) => {
                                    onChange(e.value);
                                }}
                                placeholder={"Selecione o novo gênero: "}
                                ></Select>
                            )}>
                        </Controller>
                        <span className='text-danger'>{errors?.new_gender?.message}</span>
                        
                        <Label text={"Novo ISBN:"} />
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={defaultISBN}
                            {...register("new_isbn")}
                        />
                        <span className='text-danger'>{errors?.new_isbn?.message}</span>
                        <Label text={"Novo numero de exemplares:"} />
                        <input 
                            type="number"
                            className="form-control"
                            defaultValue={defaultAmount}
                            {...register("new_amount")}
                        />
                        <span className='text-danger'>{errors?.new_amount?.message}</span>
                        <Label text={"Novo código do livro:"} />
                        <input 
                            type="text"
                            className="form-control"
                            defaultValue={defaultCDD}
                            {...register("new_cdd")}
                        />
                        <span className='text-danger'>{errors?.new_cdd?.message}</span>
                        
                        <Label text={"Novo volume"}></Label>
                        <input type="number"
                            defaultValue={defaultVolume}
                            className="form-control"
                            {...register("new_volume")}
                        />
                        <span className='text-danger'>{errors?.new_volume?.message}</span>

                        <br />
                        <Button type={"submit"}
                            text={"Editar"}
                            className={"btn btn-info text-white"}
                        />
                    </form>
                </div>
            </div>
        )
    }
}
