import { SvgClose } from "../Icons/close"
import { Label } from "../Label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../Button";
import { number, object, string } from "yup";
import axiosClient from "../../config/axiosClient";

export const ModalGroup = ({ openEditGroup, close, id_group, defaultGroup }) => {
    const schema = object({
        id_group: number(),
        new_group: string(),
    })
    const{ register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const handleSubmitEditGroup = (data) => {
        axiosClient.put("editGroup", {
            id: data.id_group,
            group: data.new_group,        
        });
        document.location.reload();
    }
    if(openEditGroup) {
        return(
            <div className="background-edit" >
                <div id="modal-edit">
                    <div className="header-edit">
                        <h2>Renovar livro</h2>
                        <SvgClose onClick={close} />
                    </div>
                    <form onSubmit={handleSubmit(handleSubmitEditGroup)}>
                        <input 
                            type={"hidden"}
                            defaultValue={id_group}
                            {...register("id_group")}
                        />
                        <span className='text-danger'>{errors?.id_group?.message}</span>
                        <Label text={"Novo nome da turma:"} />
                        <input type={"text"}
                            className="form-control"
                            defaultValue={defaultGroup}
                            {...register("new_group")}
                        />
                        <span className='text-danger'>{errors?.new_group?.message}</span>
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
    else {
        return <></>
    }
}