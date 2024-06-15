import './styles.css';

export const AboutUs = ({ team, text, description }) => {
    return (
            <section className="teamLibrary">
                <div className="team-photo">
                    <img src={ team } alt={""} />
                </div>

                <div className="aboutUs">
                    <h1>{ text }</h1>
                    <p>{ description }</p>
                </div>
            </section>
    )
}