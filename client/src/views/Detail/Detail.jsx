import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cleanDetail, getVideogame } from "../../redux/actions";
import style from './Detail.module.css'

const Detail = () => {

    const {id} = useParams();

    const dispatch = useDispatch();

    const videogame = useSelector(state => state.videogame)
 
    useEffect(() => {
        console.log('estoy en detail', id);
        dispatch(getVideogame(id))
        return () => dispatch(cleanDetail())
    }, [id])

    return (
        <div className={style.container}>
            <div className={style.title}>
                <h1>{videogame?.name}</h1><hr/>
            </div>
            
            <div className={style.containerImg}>
                <img src={videogame.image} alt={videogame.name}/>
                <p>ID: {videogame?.id}</p>
            </div>
            
            <div className={style.parteDer}>
                <h3>Description</h3>
                <p>{videogame?.description}</p><hr/>
                <div className={style.subtitle}>
                    <h3>Platforms:</h3>
                    <p>{videogame?.platforms && videogame.platforms.map(platform => <>{platform} </>)}</p><hr/>
                </div>
                <div className={style.subtitle}>
                    <h3 >Release:</h3>
                    <p>{videogame?.released}</p><hr/>
                </div>
                <div className={style.subtitle}>
                    <h3 >Genres:</h3>
                    <p> {videogame?.genres && videogame.genres.map(genre => <>{genre} </>)}</p><hr/>
                </div>
                <div className={style.subtitle}>
                    <h3>Raitng:</h3>    
                    <p>{videogame?.rating}</p>
                </div>
            </div>
            <Link to='/home' className={style.link}>BACK</Link>
        </div>
    )
}

export default Detail;