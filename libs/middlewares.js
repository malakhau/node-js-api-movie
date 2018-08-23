const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const responseTime = require('response-time');
const validator = require('express-validator');
const logger = require('./logger');

module.exports = app => {
    const allowedOrigins = [process.env.APP_URL];

    app.use(responseTime());
    app.use(helmet());
    app.use(cors({
        origin(origin, next) {
            if (!origin) {
                next(null, true);
            } else if (!allowedOrigins.includes(origin)) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin';
                next(new Error(msg), false);
            } else {
                next(null, true);
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'X-Access-Token'],
        preflightContinue: false
    }));
    app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" status: :status :res[content-length] - :response-time ms ":referrer" ":user-agent"', {
        stream: logger.stream
    }));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.json({type: 'application/vnd.api+json'}));
    app.use(bodyParser.urlencoded({'extended': 'true'}));
    app.use(validator());
    app.use(cookieParser());
    app.use(methodOverride('X-HTTP-Method-Override'));

    if (process.env.NODE_ENV === 'development') {
        app.use(errorHandler({log: errorNotification}));
    }

    function errorNotification(err, str, req) {
        const title = `Error in ${req.method} ${req.url}`;
        logger.error(title, str);
    }
};
