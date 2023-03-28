const {getVideogames, getVideogameById, getVideogameName, postVideogame, } = require('../controllers/videogameControllers');

require('dotenv').config();
const {
    API_KEY
  } = process.env;

const getVideogameHandler = async (req, res) => {
    try {

        const {name} = req.query;
        if (name) {
            const busqueda = await getVideogameName(name);
            if(busqueda.error) return res.status(400).send(busqueda.error)
            return res.status(200).json(busqueda);
        }
        const datos = await getVideogames(`https://rawg.io/api/games?key=${API_KEY}`)
        console.log('estoy en el handler');
        return res.status(200).json(datos);

    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const getVideogameByIdHandler = async (req, res) => {
    const {id} = req.params;
    
    try {
        const videogame = await getVideogameById(id)
        return res.status(200).json(videogame)
    } catch (error) {
        return res.status(400).send('soy el error del id');
    }
};

const postVideogameHandler = async (req, res) => {
    try {
        const {name, description, platforms, image, release_date, rating, genreId} = req.body;

        const newVideogame = await postVideogame(name, description, platforms, image, release_date, rating, genreId);

        return res.status(200).send('Videojugo creado');
    } catch (error) {
        return res.status(400).send('Videojuego no creado')
    }
};

module.exports = {
    getVideogameHandler,
    getVideogameByIdHandler,
    postVideogameHandler
}