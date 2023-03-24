import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from './CardsContainer.module.css'

const CardsContainer = () => {

    const videogames = useSelector(state => state.videogames);
    
    const genresSelected = useSelector(state => state.genresSelected);

    const [pagina, setPagina] = useState(1);
    const itemsPerPage = 15;

    // logica para obtener la seccion actual de elementos
    const ultimoElemento = pagina * itemsPerPage;
    const primerElemento = ultimoElemento - itemsPerPage;
    const CardsARenderizar = videogames.slice(primerElemento, ultimoElemento)
    let contador = 0;

    console.log('estoy en cardsContainer', genresSelected);
    console.log('soy videogames', videogames);

    const handlerPaginado = (numeroDePagina) => {
        setPagina(numeroDePagina);
    }

    return (
        <>
            {
                genresSelected.length === 0 ?
                <div className={style.containerCards}>
                    {CardsARenderizar.map(game => {
                        return <Card
                            name={game.name}
                            image={game.image}
                            genres={game.genres}
                        />
                    })}
                </div> : 
                <div className={style.containerCards}>
                    {videogames.map((game) => game.genres.map((genre) => {
                        if(genresSelected.includes(genre) && contador < 15) {
                            contador++;
                            return <Card
                            name={game.name}
                            image={game.image}
                            genres={game.genres}
                        />
                        } else {
                            console.log('no estoy')
                        }
                    }))}
                </div> 
            } 

            {
               Array(Math.ceil(videogames.length / itemsPerPage)).fill().map((_, index) => {
                return (
                    <button onClick={() => handlerPaginado(index + 1)} >
                        {index + 1}
                    </button>
                )})
            }
                {/* console.log('soy el array raro',Array(Math.ceil(videogames.length / itemsPerPage)).fill()) */}
        </>
    )
}

export default CardsContainer;