import style from './Card.module.css';

const Card = (props) => {
    return (
        <div className={style.container}>
            <p>Name: {props.name}</p>
            <img src={props.image} alt={props.name}/>
            <p>Genres: {props.genres.map(genre => <>{genre} </>)} </p>
        </div>
    )
}

export default Card;