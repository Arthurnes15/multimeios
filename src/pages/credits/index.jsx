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
                text={"Responsáveis:"}
                description={"A equipe responsável pelo desenvolvimento do sistema da biblioteca Multimeios da  escola EEEP Comendador Miguel Gurgel, foi composta por 6 pessoas. No processo de desenvolvimento desse sistema, utilizamos as tecnologias dos frameworks Bootstrap, ReactJS, NodeJS,  e o banco de dados MySQL."} />

            <section className="members">
                <h2>Membros da Equipe</h2>
                <MembersCards members={members} />
            </section>

            <section className="container collaborators">
                <h2>Colaboradores</h2>
                <MembersCards members={collaborators} />
            </section>

            <section className="info3">
                <h1>A Informática de 2022 a 2024</h1>
                <div className="description-info">
                    <h2>Prefácio</h2>
                    <p>Olá, caro leitor! Esse texto está sendo escrito com apenas um
                        objetivo… Que você conheça a turma de Informática 2022 - 2024.</p> <br />
                    <h2>Capítulo 01</h2>
                    <p>Entramos na escola no início de 2022, logo após a pandemia, sem
                        entender como funcionava a vida direito, com pensamentos fechados
                        e sem saber a imensidão do que é o ensino médio. Sem nos
                        conhecermos, fomos iniciando conversas básicas de convivência,
                        principalmente nos dias que tivemos o momento com os
                        protagonistas e, com isso, conseguimos conhecer um pouco mais
                        sobre cada um.
                        Com o início das aulas, foi feito o primeiro mapeamento e assim os
                        grupinhos começaram a surgir… Alguns mais quietos, outros mais
                        elétricos mas sempre mantendo o respeito entre todos. Nunca fomos
                        uma turma de brigar muito e quando brigávamos, logo nós
                        resolviamos. Já no 2° semestre do primeiro
                        ano começaram os projetos para separar os novatos dos veteranos.
                        Tivemos 3 projetos seguidos, com intervalos mínimos, e foi com eles
                        que percebemos que a INFO, quando se unia, era muito mais forte
                        que pensávamos. O primeiro projeto foi o “Eu leio, eu livro”
                        , fundado pela gestão e o Klausney, um dos professores de português da época.
                        Pode-se dizer que esse projeto foi o primeiro a nos mostrar que ou
                        mudávamos para melhor ou então iríamos decair muito! Com
                        apresentações nas salas, fantasias criadas, ensaios malucos e teatro
                        no pátio, nossa nota final do projeto foi <strong>8.7</strong>, uma nota não tão boa
                        para o gosto de uns mas que foi o pontapé inicial para a melhora da
                        INFO. O nosso segundo projeto foi o “Hallow Muertos”, um projeto
                        que juntava o “Dia de Los Muertos” e o “Halloween” em um só. Na
                        época, a nossa turma ficou com os países e suas culturas que
                        tinham/têm a prática do “Dia de Los Muertos”. Esse projeto já foi um
                        pouco melhor, já que tínhamos desenvolvido uma sala temática mais
                        elaborada e a galera que ia falar discursava um pouco melhor. Nesse
                        projeto, nossa nota foi <strong>9.7</strong>, um grande avanço comparado ao
                        primeiro que enfrentamos, porém, não para por aí. A nossa última
                        apresentação, mas não menos importante, foi o “Africanidades”.
                        Posso dizer que essa foi a maior apresentação que a INFORMÁTICA já
                        fez. Entregamos sala temática, atuação, dança, choro, aplausos e
                        muito mais. Foi nesse projeto que a INFO provou que enfrentaria
                        qualquer outro, juntos, como uma família, com muita força, garra e
                        vontade de ser sempre melhor. Esse projeto ficará guardado na
                        memória da INFO, nossa nota final foi <strong>9.8</strong>, um recorde nosso.</p> <br />
                    <h2>Capítulo 02</h2>
                    <p>O início do segundo ano foi um pouco turbulento, entrou uma nova
                        professora de Matemática, a antiga que tinha saído era muito boa e
                        tínhamos medo e receio dessa não conseguir suprir a genialidade da
                        antiga…. Por sorte, a nova professora era espetacular e, depois de
                        um tempo, se tornou a mãe da INFO... Um abraço, Jéssyka!
                        No primeiro semestre do 2° ano nós tivemos a feira científica(FECIM), na qual
                        tínhamos que apresentar um estudo com base em dados, banner,
                        experiências e pesquisas pessoais para provar que o nosso tema era
                        verídico. Fazendo um resumo, tínhamos que fazer um trabalho
                        científico estilo os de faculdade e apresentar para os jurados e a
                        escola. A nossa sala foi dividida em 4 grupos: o de Matemática, o de
                        Linguagens, o de Ciências Humanas e o das Ciências da Natureza. No
                        fim de tudo, a nossa sala conseguiu levar os certificados com as
                        maiores notas dos <strong>QUATRO TRABALHOS</strong> sendo a sala com as maiores
                        notas e levando mais um recorde para casa.
                        Nesse mesmo ano, tivemos um aluno da nossa sala, o José Fernando
                        de Lima Rodrigues, que fez uma redação para o prêmio SEFIN e
                        ganhou ela em primeiro lugar, recebendo como prêmio um Iphone 14. Além
                        dele, tivemos os alunos Pedro Ricardo Alves Freitas, Jennifer Anne
                        Magalhães Oliveira e João Marcos Aragão Mesquita Rogério que
                        passaram para a final da ONHB e foram para São Paulo. E por último mas não menos
                        importante, a aluna Tamires de Fátima Frota da Silva ganhou o
                        prêmio da Fábrica de Programadores em 1° lugar com a construção
                        da idéia de seu projeto “MEI”, da uma olhadinha na <a href="https://www.opovo.com.br/noticias/economia/2023/12/18/fabrica-de-programadores-premia-game-focado-em-ajudar-criancas-com-autismo.html" target="_blank" rel='noreferrer'>matéria</a> do POVO. Além disso, se iniciaram as
                        aplicações das provas bimestrais estilo ENEM, 90 questões e uma
                        redação em um dia e mais 90 no outro, rompendo com o modelo antigo de provas. Com isso, o aluno Rony Edney
                        Silva Lima conseguiu fazer o feito de fechar a prova de Matemática,
                        que possuía 45 questões, se tornando o primeiro aluno a ter feito
                        aquilo na escola inteira! Sem contar, claro, os mais de 50 certificados
                        que a professora de matemática, Jéssyka, havia entregado ao longo
                        dos anos para aqueles alunos que tiveram ótimos resultados em sua
                        matéria.</p> <br />
                    <h2>Capítulo Final</h2>
                    <p>Enfim, chegamos ao terceiro ano do ensino médio… Depois de ter
                        passado por várias provas, feiras e trabalhos, o ano do estágio e
                        vestibulares tinha iniciado. Entretanto, não ficamos isentos do último
                        e principal evento da escola, “O Conexões”, que tem como objetivo
                        principal tornar o conhecimento sobre os cursos mais amplo para a
                        comunidade.
                        A turma de informática participou do evento com três salas: Um
                        teatro ao vivo sobre a importância de uma limpeza preventiva,
                        oficina de Python para gerar uma IA, e um cinema para mostrar uma
                        peça sobre a mulher e sua relação e importância na tecnologia.
                        Todas as apresentações foram um sucesso! Logo após isso tivemos
                        um foco total nos vestibulares, principalmente após as férias do meio
                        do ano.
                        Junto à volta às aulas tivemos a saída de uma pessoa muito
                        importante para a informática, a professora de matemática Jéssyka,
                        que havia comentado antes, mas ela saiu com o objetivo de
                        conquistas maiores, então, no fim das contas, foi muito bom!
                        Voltando ao fato de metade do ano ter passado, uma grande figura
                        para a INFO também se despedia da gente, a aluna Samili dos Santos
                        Amarante precisou fazer uma viagem, com isso, sua saída do curso foi
                        inevitável e, sabendo que ela é uma parte importante da INFO, não
                        ficaria de fora desse texto.
                        Vestibulares se aproximando, estágio iniciado e a mente do aluno de
                        terceiro ano estava a todo vapo. Em um canto da sala alguém
                        fazendo redação, no outro vários cálculos matemáticos, olhando para
                        frente tinha alguém resolvendo questões estilo ENEM e outros estilo
                        UECE. Enfim. Uma loucura completa querer ter um futuro, mas a
                        maioria estava correndo atrás, de certa forma. Além da pressão dos
                        vestibulares, tivemos as relações de estágio que exigiam bastante da
                        nossa capacidade de conhecimento, gestão, solução de problemas e
                        várias outras especialidades. Mas isso tudo valeu a pena… Lembram
                        do prêmio que a aluna Tamires ganhou em 2022, no nosso primeiro
                        ano? Ela foi <a href="https://www.youtube.com/watch?v=uXXDxnRA4zI" target="_blank" rel="noreferrer">entrevistada</a>, no ano de 2024. Além dela, os alunos Pedro Ricardo e João Marcos,
                        citados mais acima, conseguiram um ingresso na faculdade FGV(Faculdade Getúlio Vargas) com
                        bolsa de 100% e, juntamente a eles, o aluno João Pedro Aragão
                        Mesquita Rogério também ingressou na faculdade. Sem contar, claro,
                        as diversas aprovações que sairão após esse texto ser publicado…
                        Por fim, tivemos o nosso <a href="https://www.youtube.com/watch?v=GIpSt_URmwg" target="_blank" rel="noreferrer">Projeto Social</a> que foi relacionado a uma
                        ONG (Amiguinhos de Jesus) no qual o objetivo do projeto era
                        arrecadar doações para a instituição.
                        No final das contas, muito sucesso foi destinado aos alunos da
                        informática porque nós somos isso tudo aí que você acabou de ler…
                        Não vou falar aqui que foi fácil porque não foi, não é e
                        nunca será. Mas, com pessoas certas, tudo se torna mais leve, mais
                        divertido e com um objetivo mais solidificado. Tenho muito a
                        agradecer as pessoas que fizeram parte da INFO, não tinham pessoas
                        melhores para está lá. Acredito que nós nos juntamos com algum
                        objetivo e intuito que não poderá ser desfeito jamais.</p>
                        <br />
                        <p>- Ulisses Ribeiro Ferreira</p>
                </div>
                <div className="photo-info">
                    <img src={info} alt="informática 3" />
                </div>
            </section>

            <Footer />
        </>
    )
}