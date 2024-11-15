import { useState } from "react"
import { SvgEdit } from "../Icons/edit"
import { SvgTrash } from "../Icons/trash"
import { ModalGroup } from "../ModalEditGroup"
import Axios from "axios"

export const Group = ({id_group, nameGroup}) => {
    const [openModalGroup, setOpenModalGroup] = useState(false);
    const handleDeleteGroup = () => {
        const question = window.confirm("Você tem certeza que deseja apagar essa turma?");
        if (question === true) {
            Axios.delete(`http://localhost:3001/deleteGroup/${id_group}`)
                .then(() => {
                    document.location.reload();
                });
        }
    }

    return (
        <>
            <ModalGroup openEditGroup={openModalGroup}
            close={() => setOpenModalGroup(false)}
            id_group={id_group}
            defaultGroup={nameGroup}
            />
            <div className={`group ${nameGroup}`}>
                <h4>{nameGroup}</h4>
                <div className="icons-groups">
                    <SvgEdit onClick={() => setOpenModalGroup(true)}></SvgEdit>
                    <SvgTrash onClick={() => {handleDeleteGroup()}}></SvgTrash>
                </div>
            </div>
        </>
    )
}