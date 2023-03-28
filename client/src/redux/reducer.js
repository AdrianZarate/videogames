import { GET_VIDEOGAME, GET_VIDEOGAMES, GET_VIDEOGAMES_NAME, GET_GENRES, GENRES_SELECTED, ORDENAR_ALFABETICAMENTE, ORDENAR_RATING, ORDENAR_CREATED, CLEAN_DATAIL } from "./actions";

const inicialState = {
    videogames: [],
    videogame:[],
    genres: [],
    genresSelected: [],
};

const rootReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ORDENAR_ALFABETICAMENTE:
            return {...state, videogames: action.payload}
        case GET_VIDEOGAME:
            return {...state, videogame: action.payload};
        case GET_VIDEOGAMES_NAME:
            return {...state, videogames: action.payload};
        case GET_GENRES:
            return {...state, genres: action.payload};
        case GET_VIDEOGAMES:
            return {...state, videogames: action.payload};
        case GENRES_SELECTED: 
            return {...state, genresSelected: action.payload};  
        case ORDENAR_RATING:
            return {...state, videogames: action.payload}
        case ORDENAR_CREATED:
            return {...state, videogames: action.payload}
        case CLEAN_DATAIL:
            return {...state, videogame: []}
        default:
            return {...state};
    }
}

export default rootReducer;