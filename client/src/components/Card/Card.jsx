import { Link } from 'react-router-dom';
import style from './Card.module.css';

const Card = (props) => {
    return (
        <div className={style.container}>
            <Link to={`/detail/${props.id}`}>
                <p>Name: {props.name}</p>
            </Link>
            <img src={props.image} alt={props.name}/>
            <p>Genres: {props.genres.map(genre => <>{genre} </>)} </p>
            
        </div>
    )
}

export default Card;