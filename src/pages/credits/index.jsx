import { Navbar } from '../../components/Navbar';
import { MembersCards } from "../../components/MembersCards";
import { members } from '../../utils/people';
import { collaborators } from "../../utils/people";
import { AboutUs } from '../../components/AboutUs';
import { Footer } from '../../components/Footer'
import team from '../../assets/img/team.png';
import info from '../../assets/img/info3.jpg';
import './styles.css';

export const Credits = () => {
    return (
        <>
            <Navbar />

            <AboutUs team={team}
            text={"Quem somos?"}
            description={"Somos uma equipe composta por 6 pessoas, responsáveis por desenvolver um sistema para a biblioteca da EEEP Comendador Miguel Gurgel, denominada Centro de Multimeios. No desenvolvimento desse sistema, utilizamos as tecnologias dos frameworks ReactJS e NodeJS, e o banco de dados MySQL."} />

            <section className="members">
                <h2>Membros da Equipe</h2>
                <MembersCards members={members} />
            </section>

            <section className="container collaborators">
                <h2>Colaboradores</h2>
                <p>Gostaríamos de expressar nossa profunda gratidão e admiração aos nossos dedicados colaboradores, cujo empenho e talento foram fundamentais para o sucesso dos nossos projetos. Cada um de vocês trouxe habilidades únicas e uma paixão inigualável, contribuindo significativamente para as nossas conquistas. A tarefa de catalogar os livros exigiu atenção meticulosa aos detalhes e um profundo compromisso com a organização e acessibilidade do conhecimento. Além de alguns desenvolvedores ajudarem a construir certas lógicas envolvidas no processo do sistema.</p>
                <MembersCards members={collaborators} />
            </section>

            <section className="info3">
                <h1>A Informática de 2022 a 2024</h1>
                <div className="description-info">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta hic quaerat cum sapiente voluptatum quia eos harum atque, delectus consectetur, laudantium quos. Repellat culpa labore laboriosam, mollitia natus dolores aperiam/.</p>
                </div>
                <div className="photo-info">
                    <img src={info} alt="informática 3" />
                </div>
            </section>

            <Footer />
        </>
    )
}