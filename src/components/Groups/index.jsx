import { useEffect, useState } from "react"
import { Group } from "../Group";
import Axios from "axios";
import "./styles.css";

export const Groups = () => {
    const [listGroups, setListGroups] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/getGroups")
            .then((response) => {
                setListGroups(response.data)
            })
    }, []);

    return (
            <>
                <article className="container allGroups">
                    <h1>Turmas Cadastradas</h1>
                        <section className="groups">
                            {typeof listGroups !== "undefined" && listGroups.map((group) => {
                                return (
                                    <Group key={group.id_turma}
                                    id_group={group.id_turma}
                                    nameGroup={group.nome_turma}
                                    listGroup={listGroups}
                                    setListGroup={setListGroups}
                                    />
                                )
                            })}
                        </section>
                </article>
            </>
    )
}