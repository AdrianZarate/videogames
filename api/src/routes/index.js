const mainRouter = require('express').Router();
const genresRouter = require('./genresRouter');
const videogameRouter = require('./videogamesRouter');

// Rutas
mainRouter.use('/videogames', videogameRouter);
mainRouter.use('/genres', genresRouter);

module.exports = mainRouter;