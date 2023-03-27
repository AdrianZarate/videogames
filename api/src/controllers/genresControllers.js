require('dotenv').config();
const {
    API_KEY
  } = process.env;

const axios = require('axios');
const {Genre} = require('../db')

const getGenres = async () => {

    const infoDB = await Genre.findAll();

    if (!infoDB.length) {
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genresName = response.data.results.map(genre => ({name: genre.name}));
    
        console.log('soy los generos que guardo', genresName);
        await Genre.bulkCreate(genresName);
        return genresName;
    }

    return infoDB.map(genre => ({name: genre.name}));
}

module.exports = {
    getGenres
}