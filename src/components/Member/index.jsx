import { Link } from 'react-router-dom';
import './styles.css';

export const Member = ({ color, photo, name, job, insta, url }) => {
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
                    <span className="insta">
                        <Link to={url} target="_blank"> {insta} </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}