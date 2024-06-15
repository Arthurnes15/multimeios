import './styles.css';

export const Member = ({ color, photo, name, job, insta }) => {
    return(
        <div className="member" style={{backgroundColor: color}}>
            <div className="photo">
                <img src={photo} alt={name} />
            </div>
            <div className="info">
                <div className="name">
                    <h3>{ name }</h3>
                </div>
                <div className="job-insta">
                    <span>{ job }</span>
                    <span>{ insta }</span>
                </div>
            </div>
        </div>
    );
}