const result = require('dotenv').config({path: './config/.env.test'});
const logger = require('../libs/logger');

if (result.error) {
    throw result.error
}

logger.info(`Created env variables: ${JSON.stringify(result.parsed)}`);

module.exports = {
};
