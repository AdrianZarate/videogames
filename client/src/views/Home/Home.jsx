import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getGenres } from "../../redux/actions";

const Home = () => {

    // cuando se monta que haga el dispatch
    // useEffect() - useDispatch

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    },[dispatch]);

    return(
        <>
            <SearchBar/>
            <hr/>
            <CardsContainer/>
        </>
    )
}

export default Home;