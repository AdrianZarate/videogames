import { Link } from "react-router-dom";
import style from './NavBar.module.css';

const NavBar = () => {
    return (
        <div className={style.container}>
            <Link to='/home' className={style.btn}>Home</Link>
            <Link to='/create' className={style.btn}>Form</Link>
        </div>
    )
}

export default NavBar;