const result = require('dotenv').config({path: './config/.env.development'});
const logger = require('../libs/logger');

if (result.error) {
    throw result.error
}

logger.info(`Created env variables: ${JSON.stringify(result.parsed)}`);

module.exports = {
};
