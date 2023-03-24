const validate = (req, res, next) => {
    const {name, description, platforms, image, release_date, rating, genreId} = req.body;

    if (!name || !description || !platforms || !image || !release_date || !rating || !genreId) return res.status(400).send('te faltaron los datos');
    
    next();
}

module.exports = validate;