require('dotenv').config();
const {
    API_KEY
  } = process.env;

const axios = require('axios');
const {Op} = require('sequelize');
const {Videogame, Genre} = require('../db')

// const URL = `https://rawg.io/api/games?key=${API_KEY}`;

const getVideogames = async (url, cienJuegos = [], count = true) => {
    
    console.log('sacando los 100 juegos van: ',cienJuegos.length);
    
    if (cienJuegos.length >= 100) return cienJuegos.splice(0, 100);

    if (count) {
        const responseDB = await Videogame.findAll({include: { model: Genre }})
            .then(response => response.map(game => ({
                id: game.id,
                name: game.name,
                image: game.image,
                genres: game.genres.map(genre => genre.name),
                rating: game.rating,
                created: game.created
            })));
        count = false
        cienJuegos = cienJuegos.concat(responseDB)
    }

    const {next, results} = (await axios.get(url)).data;

    const response = results.map(game => ({
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.genres.map(genre => genre.name),
        rating: game.rating,
        created: game.created = false
    }));

    cienJuegos = cienJuegos.concat(response)

    return getVideogames(next, cienJuegos, count);
}

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

const getVideogameById = async (id) => {

    let response; 
    if(uuidRegex.test(id)) {
        console.log('buscando por id');
        
        response = await Videogame.findByPk(id, {
            attributes: ['id', 'name', 'description','platforms', 'image', 'release_date','rating','created'],
            include: [{
                model: Genre,
                attributes: ['name'],
                through: { attributes: [] } // para evitar incluir la tabla intermedia
            }]
        });

        const nuevaResponse = {
            id: response.id,
            name: response.name,
            description: response.description,
            platforms: response.platforms,
            image: response.image,
            released: response.release_date,
            rating: response.rating,
            created: response.created,
            genres: response.genres.map(genre => genre.dataValues.name)
        }

        console.log('luego de la promesa', nuevaResponse.genres);
        return nuevaResponse;
    } else {
        response = await axios.get(`https://rawg.io/api/games/${id}?key=${API_KEY}`)
        .then(response => response.data)
        .then(response => ({
            id: response.id,
            name: response.name,
            image: response.background_image,
            platforms: response.platforms.map(platform => platform.platform.name),
            description: response.description_raw,
            released: response.released,
            rating: response.rating,
            genres: response.genres.map(genre => genre.name),
            created: false
        }));
        console.log('si estoy entrando', response);
        return response; 
    }
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
        // id: response.id,
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
    console.log('estoy en el post revisando newVideogame.__proto__ ',newVideogame.__proto__);
    console.log('datos para guardar en la DB',newVideogame);

    await newVideogame.addGenres(genreId); // que hace esta linea?
    
    return newVideogame.dataValues;
}

module.exports = {
    getVideogames,
    getVideogameById,
    getVideogameName,
    postVideogame
}