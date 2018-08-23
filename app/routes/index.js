const moviesController = require('../controllers/index.js').movies;
const commentsController = require('../controllers/index.js').comments;

module.exports = app => {

    app.post('/movies', moviesController.createMovie);
    app.get('/movies', moviesController.getMovies);
    app.get('/movies/:uuid', moviesController.getMovie);
    app.put('/movies/:uuid', moviesController.updateMovie);
    app.delete('/movies/:uuid', moviesController.deleteMovie);
    app.all('/movies', (req, res) => {
        res.status(405).send({message: 'Method Not Allowed'});
    });

    app.post('/comments', commentsController.createComment);
    app.get('/comments', commentsController.getComments);
    app.get('/comments/:uuid', commentsController.getComment);
    app.put('/comments/:uuid', commentsController.updateComment);
    app.delete('/comments/:uuid', commentsController.deleteComment);
    app.all('/comments', (req, res) => {
        res.status(405).send({message: 'Method Not Allowed'});
    });

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    // no stacktraces leaked to user unless in development environment
    app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
            status: 'error',
            message: err.message,
            error: (process.env.NODE_ENV === 'development') ? err.stack : {}
        });
    });
};
