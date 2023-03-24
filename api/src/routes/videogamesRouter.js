const videogameRouter = require('express').Router();
const { getVideogameHandler, getVideogameByIdHandler, postVideogameHandler } = require('../handlers/videogameHandlers');
const validate = require('../middlewares');

// validate para proteger mi DB "Mi DB es sagrada"


// Router get
videogameRouter.get('/', getVideogameHandler);

videogameRouter.get('/:id', getVideogameByIdHandler);

// Router post
videogameRouter.post('/', validate, postVideogameHandler);

module.exports = videogameRouter;