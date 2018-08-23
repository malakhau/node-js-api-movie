const Comment = require('../models/index.js').comment;
const Movie = require('../models/index.js').movie;

module.exports = {

    createComment(req, res, next) {
        req.checkBody('title', 'Title should not be empty').notEmpty().trim();
        req.sanitizeBody('description').trim();
        return req.getValidationResult().then(errors => {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return Comment.create({
                    title: req.body.title,
                    description: req.body.description,
                    movieUuid: req.body.movieUuid
                }).then(comment => {
                    res.status(201).send(comment);
                });
            }
        }).catch(err => {
            err.status = 400;
            next(err);
        });
    },

    getComments(req, res, next) {
        if(req.query.movie_uuid){
          let options = {
            where: {
              uuid: req.query.movie_uuid
            },
            include: [{
                model: Comment,
                as: 'comments'
            }]
          };
          return Movie.findAll(options).then(movies => {
              res.status(200).send(movies);
          }).catch(err => {
              err.status = 400;
              next(err);
          });
        } else{
          return Comment.findAll().then(comments => {
              res.status(200).send(comments);
          }).catch(err => {
              err.status = 400;
              next(err);
          });
        }
    },

    getComment(req, res, next) {
        req.checkParams('uuid', 'UUID should be the uuid').isUUID();
        return req.getValidationResult().then(errors => {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return Comment.findById(req.params.uuid).then(comment => {
                    if (!comment) {
                        res.status(404).send({
                            message: 'Comment Not Found'
                        });
                    } else {
                        res.status(200).send(comment);
                    }
                });
            }
        }).catch(err => {
            err.status = 400;
            next(err);
        });
    },

    updateComment(req, res, next) {
        req.checkParams('uuid', 'UUID should be the uuid').isUUID();
        req.checkBody('title', 'Title should not be empty').notEmpty().trim();
        req.sanitizeBody('description').trim();
        return req.getValidationResult().then(errors => {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return Comment.findById(req.params.uuid).then(comment => {
                    if (!comment) {
                        res.status(404).send({
                            message: 'Comment Not Found'
                        });
                    } else {
                        return comment.update({
                            title: req.body.title,
                            description: req.body.description
                        }).then(updatedComment => {
                            res.status(200).send(updatedComment);
                        });
                    }
                });
            }
        }).catch(err => {
            err.status = 400;
            next(err);
        });
    },

    deleteComment(req, res, next) {
        req.checkParams('uuid', 'UUID should be the uuid').isUUID();
        return req.getValidationResult().then(errors => {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return Comment.findById(req.params.uuid).then(comment => {
                    if (!comment) {
                        res.status(404).send({
                            message: 'Comment Not Found'
                        });
                    } else {
                        return comment.destroy().then(() => {
                            res.status(200).send({message: `Comment with id: ${req.params.uuid} was successfully deleted`});
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
