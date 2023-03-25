import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getVideogame } from "../../redux/actions";

const Detail = () => {

    const {id} = useParams();

    const dispatch = useDispatch();

    const videogame = useSelector(state => state.videogame)
 
    useEffect(() => {
        console.log('estoy en detail', id);
        dispatch(getVideogame(id))
    }, [id])

    return (
        <>
            <Link to='/home'>pa'tras</Link>
            <h1>Esta es la vista de Detail</h1>
            <div>
                <h1>id: {videogame?.id}</h1><hr/>
                <h1>nombre: {videogame?.name}</h1><hr/>
                <h1>descripcion: {videogame?.description}</h1><hr/>
                <h1>plataformas: {videogame?.platforms && videogame.platforms.map(platform => <>{platform} </>)}</h1><hr/>
                {/* <h1>plataformas: {videogame?.platforms}</h1><hr/> */}
                <h1>fecha de lanzamiento: {videogame?.released}</h1><hr/>
                <h1>generos: {videogame?.genres && videogame.genres.map(genre => <>{genre} </>)}</h1><hr/>
                <h1>Raitng: {videogame?.rating}</h1>
                <img src={videogame.image} alt={videogame.name}/>
            </div>
        </>
    )
}

export default Detail;