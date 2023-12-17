const { Movie } = require('../models');
const MovieRepository = require('../repositories/movie_repositories');

class MovieController {
    static async getSemua(req, res, next) {
        try {
            const data = await MovieRepository.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const movie = await Movie.findByPk(id);

            if (!movie) {
                throw { name: 'notFound' };
            }

            res.status(200).json(movie);
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            const { name, category } = req.body;
            const newMovie = await Movie.create({ name, category });
            res.status(201).json(newMovie);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, category } = req.body;
            const updateMovie = await Movie.update({ name, category }, { where: { id } });
            res.status(200).json(updateMovie);
        } catch (error) {
            next(error);
        }
    }

    static async uploadImage(req, res, next) {
        try {
            const { id } = req.params;

            // Check if the movie exists
            const movie = await Movie.findByPk(id);
            if (!movie) {
                throw { name: 'notFound' };
            }

            // Update the 'photo' field in the database with the filename of the uploaded image
            movie.photo = req.file.filename;
            await movie.save();

            res.status(200).json({ message: 'Image uploaded successfully' });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            await Movie.destroy({ where: { id } });
            res.status(200).json({ message: 'Movie deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MovieController;
