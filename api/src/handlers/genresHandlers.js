const {getGenres} = require('../controllers/genresControllers');

const getGenresHandler = async (req, res) => {
    try {
        const genres = await getGenres();
        return res.status(200).json(genres);
    } catch (error) {
        return res.status(400).send('soy el error de genres')
    }
    
}

module.exports = {
    getGenresHandler
}