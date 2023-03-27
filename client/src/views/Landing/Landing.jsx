import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from './Landing.module.css'
import { getVideogames } from "../../redux/actions";

const Landing = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideogames())
    },[dispatch])

    return(
        <div className={style.container}>
            <Link to='/home' className={style.btn}>PLAY</Link>
        </div>
    )
}

export default Landing;