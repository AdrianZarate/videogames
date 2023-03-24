import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
    return (
        <div>
            <Link to='/home'>Home</Link>
            <Link to='/create'>Form</Link>
        </div>
    )
}

export default NavBar;