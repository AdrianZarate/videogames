import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VIDEOGAME = 'GET_VIDEOGAME';
export const GET_VIDEOGAMES_NAME = 'GET_VIDEOGAMES_NAME';
export const GET_GENRES = 'GET_GENRES'; 
export const GENRES_SELECTED = 'GENRES_SELECTED';
export const ORDENAR_ALFABETICAMENTE = 'ORDENAR_ALFABETICAMENTE';
export const ORDENAR_RATING = 'ORDENAR_RATING';
export const ORDENAR_CREATED = 'ORDENAR_CREATED';
export const CLEAN_DATAIL = 'CLEAN_DATAIL';


// Busca los primeros 20 juegos de la api
export const getVideogames = () => {
    return async function(dispatch) {
        const apiData = await axios.get('http://localhost:3001/videogames');
        const videogames = apiData.data;

        dispatch({type: GET_VIDEOGAMES, payload: videogames})
    }
};

// busca por el id del videojuego
export const getVideogame = (id) => {
    return async function(dispatch) {
        const apiData = await axios.get(`http://localhost:3001/videogames/${id}`);
        const videogame = apiData.data;

        dispatch({type: GET_VIDEOGAME, payload: videogame})
    }
};

// trae los juegos que coincidan con el nombre
export const getVideogamesName = (name) => {
    return async function(dispatch) {
        const apiData = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        .catch(err => alert(err.response.data));
        const videogameFilterName = apiData.data;

        dispatch({type: GET_VIDEOGAMES_NAME, payload: videogameFilterName})
    } 
};

export const getGenres = () => {
    return async function(dispatch) {
        
        const apiData = await axios.get(`http://localhost:3001/genres`)
        .catch(err => err);
        const genres = apiData.data;
    
        dispatch({type: GET_GENRES, payload: genres})
    } 
};

export const genresSelected = (newArray) => {
    
    return {type: GENRES_SELECTED, payload: newArray}
};

// ordenar alfabeticamente 
export const ordenarAlfabeticamente = (tipo) => {
    return async function(dispatch){

        const apiData = await axios.get('http://localhost:3001/videogames');
        const array = apiData.data;
    
        let newArray;
        if (tipo === "descendente") {
                newArray = array.sort((a, b) => {
                let nameA = a.name.toUpperCase(); // convertir a mayúsculas para ignorar mayúsculas y minúsculas
                let nameB = b.name.toUpperCase(); // convertir a mayúsculas para ignorar mayúsculas y minúsculas
        
                if (nameA > nameB) return 1;
                if (nameA < nameB) return -1;
                return 0;
            });
        } else if (tipo === 'ascendente'){
                newArray = array.sort((a, b) => {
                let nameA = a.name.toUpperCase(); // convertir a mayúsculas para ignorar mayúsculas y minúsculas
                let nameB = b.name.toUpperCase(); 
                if (nameA < nameB) return 1;
                if (nameA > nameB) return -1;
                return 0;
            });
        }

        // if (tipo) 
        dispatch({type: ORDENAR_ALFABETICAMENTE, payload: newArray});
    
    };
};

export const ordenarRating = (tipo) => {
    return async function(dispatch) {
        const apiData = await axios.get('http://localhost:3001/videogames');
        const array = apiData.data;

        console.log('el array', array);
        let gamesFilterRating;
        if (tipo === 'ascendente') {
            gamesFilterRating = array.sort((a,b) => a.rating - b.rating)
        } else {
            gamesFilterRating = array.sort((a, b) => b.rating - a.rating)
        }
        
        dispatch({type: ORDENAR_RATING, payload: gamesFilterRating})
    }
};

export const ordenarCreated = (tipo) => {
    return async function(dispatch) {
        const apiData = await axios.get('http://localhost:3001/videogames');
        const array = apiData.data;

        console.log('el array de created', array);
        let gamesFilterCreated;
        if (tipo === 'created') {
            gamesFilterCreated = array.filter((game) => game.created === true);
            if(!gamesFilterCreated.length) {
                return alert('No se encontraron videogames creados')
            }
        } else {
            gamesFilterCreated = array.filter((game) => game.created === false)
        }
        
        dispatch({type: ORDENAR_RATING, payload: gamesFilterCreated})
    }
};

export const postVideogame = async (form) => {
    await axios.post('http://localhost:3001/videogames', form)
    .then(res => console.log('soy la respuesta del POST',res.data))
    .catch(err => console.log('SOY EL ERROR DEL POST', form))
    // .catch(err => console.log('SOY EL ERROR DEL POST', err))
} 

export const cleanDetail = () => {
    return {type: CLEAN_DATAIL}
}