const genresRouter = require('express').Router();
const { getGenresHandler } = require('../handlers/genresHandlers');

genresRouter.get('/', getGenresHandler);

module.exports = genresRouter;