import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { ModalGroup } from "../ModalEditGroup";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../Spinner";

import axiosClient from "../../config/axiosClient";
import validateToken from "../../utils/validateToken";

export const Group = ({id_group, nameGroup}) => {
    const [auth, setAuth] = useState(false);
    const [openModalGroup, setOpenModalGroup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            axiosClient.get("getGroups")
        } else {
            validateToken()
                .then(() => setAuth(true))
                .catch(() => navigate("/"))
        };
    }, [auth, navigate]);

    return (
        <>
            <ModalGroup openEditGroup={openModalGroup}
            close={() => setOpenModalGroup(false)}
            id_group={id_group}
            defaultGroup={nameGroup}
            />

            {!auth && <Spinner/>}

            <div className={`group ${nameGroup}`}>
                <h4>{nameGroup}</h4>
                <div className="icons-groups">
                    <BsPencilSquare size={24} className="text-info" onClick={() => setOpenModalGroup(true)} />
                </div>
            </div>
        </>
    )
}