require('dotenv').config();
const {
    API_KEY
  } = process.env;

const axios = require('axios');
const {Op} = require('sequelize');
const {Videogame, Genre} = require('../db')

// const URL = `https://rawg.io/api/games?key=${API_KEY}`;

const getVideogames = async (url, hundredGames = []) => {

    
    if (hundredGames.length >= 100) return hundredGames.splice(0, 100);

    const responseDB = await Videogame.findAll({include: { model: Genre }})
        .then(response => response.map(game => ({
            name: game.name,
            image: game.image,
            genres: game.genres.map(genre => genre.name),
            rating: game.rating
        })));

    hundredGames = hundredGames.concat(responseDB)
    const {next, results} = (await axios.get(url)).data;

    const response = results.map(game => ({
        name: game.name,
        image: game.background_image,
        genres: game.genres.map(genre => genre.name),
        rating: game.rating
    }));
    console.log('estoy con hundred');
    hundredGames = hundredGames.concat(response)

    console.log(hundredGames.length);

    return getVideogames(next, hundredGames);
}

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

const getVideogameById = async (id) => {

    let response; 
    
    if(uuidRegex.test(id)) {
        response = await Videogame.findByPk(id, {
            attributes: ['id', 'name', 'description'],
            include: [{
                model: Genre,
                attributes: ['name'],
                through: { attributes: [] } // para evitar incluir la tabla intermedia
            }]
        });
    } else {
        response = await axios.get(`https://rawg.io/api/games/${id}?key=${API_KEY}`);
    }

    return response.data;
}

const getVideogameName = async (name) => {

    const nameToLower = name.toLowerCase();

    const namesDB = await Videogame.findAll({
        where: {
            name: {
                [Op.like]: `%${nameToLower}%`
            }
        },
        attributes: ['name']
    });

    const response = await axios.get(`https://rawg.io/api/games?search=${nameToLower}&key=${API_KEY}`)
    .then(response => response.data.results)
    .then(response => response.map(response => ({
        name: response.name,
        image: response.background_image,
        genres: response.genres.map(genre => genre.name),
        rating: response.rating
    })));
    
    if (response.length || namesDB.length) {
        const fusion = namesDB.concat(response)
        return fusion.slice(0, 15);
    }

    return {error: 'ese nombre no existeaaaaaaaaaaaaaa'}
}

const postVideogame = async (name, description, platforms, image, release_date, rating, genreId) => {

    const newVideogame = await Videogame.create({
        name,
        description, 
        platforms, 
        image, 
        release_date, 
        rating
    })
    console.log(newVideogame.__proto__);

    await newVideogame.addGenres(genreId); // que hace esta linea?
    
    return newVideogame;
}

module.exports = {
    getVideogames,
    getVideogameById,
    getVideogameName,
    postVideogame
}