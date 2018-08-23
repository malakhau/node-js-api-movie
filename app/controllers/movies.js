const Movie = require('../models/index.js').movie;
const Comment = require('../models/index.js').comment;
const rpn = require('request-promise-native');

module.exports = {

    createMovie(req, res, next) {
        req.checkBody('title', 'Title should not be empty').notEmpty().trim();
        return req.getValidationResult().then(errors => {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                const options = {
                    uri: 'http://www.omdbapi.com',
                    qs: {
                        apikey: process.env.API_KEY,
                        t: req.body.title,
                        type: 'movie',
                        r: 'json'
                    },
                    json: true
                };
                return rpn.get(options).then(body => Movie.create({
                    title: req.body.title,
                    plot: body.Plot,
                    year: body.Year,
                    rated: body.Rated,
                    released: body.Released,
                    runtime: body.Runtime,
                    genre: body.Genre,
                    director: body.Director,
                    writer: body.Writer,
                    actors: body.Actors,
                    plot: body.Plot,
                    language: body.Language,
                    awards: body.Awards,
                    poster: body.Poster,
                    metascore: body.Metascore,
                    imdbRating: body.imdbRating,
                    imdbVotes: body.imdbVotes,
                    imdbID: body.imdbID,
                    type: body.Type,
                    boxOffice: body.BoxOffice,
                    production: body.Production,
                    website: body.Website,
                    response: body.Response
                }).then(movie => {
                    res.status(201).send(movie);
                }));
            }
        }).catch(err => {
            err.status = 400;
            next(err);
        });
    },

    getMovies(req, res, next) {
        let order = null;
        let options = null;
        if(req.query.sort_column && req.query.sort_direction) {
          order =[req.query.sort_column, req.query.sort_direction]
        }
        if(req.query.uuids) {
              options = {
              where: {
                  uuid: req.query.uuids.split(",")
              },
              order: [
                  order || ['title','ASC']
              ],
              include: [{
                  model: Comment,
                  as: 'comments'
              }]
          }
        } else {
          options = {
            order: [
                order || ['title','ASC']
            ],
            include: [{
                model: Comment,
                as: 'comments'
            }]
        }}
        return Movie.findAll(options).then(movies => {
            res.status(200).send(movies);
        }).catch(err => {
            err.status = 400;
            next(err);
        });
    },

    getMovie(req, res, next) {
        req.checkParams('uuid', 'UUID should be the uuid').isUUID();
        return req.getValidationResult().then(errors => {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return Movie.findById(req.params.uuid, {
                    include: [{
                        model: Comment,
                        as: 'comments'
                    }]
                }).then(movie => {
                    if (!movie) {
                        res.status(404).send({
                            message: 'Movie Not Found'
                        });
                    } else {
                        res.status(200).send(movie);
                    }
                });
            }
        }).catch(err => {
            err.status = 400;
            next(err);
        });
    },

    updateMovie(req, res, next) {
        req.checkParams('uuid', 'UUID should be the uuid').isUUID();
        req.checkBody('title', 'Title should not be empty').notEmpty().trim();
        req.sanitizeBody('plot').trim();
        return req.getValidationResult().then(errors => {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return Movie.findById(req.params.uuid).then(movie => {
                    if (!movie) {
                        res.status(404).send({
                            message: 'Movie Not Found'
                        });
                    } else {
                        return movie.update({
                            title: req.body.title,
                            plot: req.body.plot,
                        }).then(updatedMovie => {
                            res.status(200).send(updatedMovie);
                        });
                    }
                });
            }
        }).catch(err => {
            err.status = 400;
            next(err);
        });
    },

    deleteMovie(req, res, next) {
        req.checkParams('uuid', 'UUID should be the uuid').isUUID();
        return req.getValidationResult().then(errors => {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return Movie.findById(req.params.uuid).then(movie => {
                    if (!movie) {
                        res.status(404).send({
                            message: 'Movie Not Found'
                        });
                    } else {
                        return movie.destroy().then(() => {
                            res.status(200).send({message: `Movie with id: ${req.params.uuid} was successfully deleted`});
                        });
                    }
                });
            }
        }).catch(err => {
            err.status = 400;
            next(err);
        });
    }
};
