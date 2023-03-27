import { Link } from 'react-router-dom';
import style from './Card.module.css';

const Card = (props) => {
    return (
        <>
            <Link to={`/detail/${props.id}`} className={style.link}>
                <div className={style.container}>
                    <h2>{props.name}</h2>
                    <div className={style.containerImg}>
                        <img src={props.image} alt={props.name}/>
                    </div>
                    <h4>{props.genres.map(genre => <>{genre} </>)} </h4>
                </div> 
            </Link>
        </>
    )
}

export default Card;