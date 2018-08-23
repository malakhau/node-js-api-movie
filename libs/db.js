const logger = require('./logger');
const models = require('./../app/models');

module.exports = () => {
    models.sequelize.sync({force: false}).then(() => {
        logger.info('Database successfully run');
    }).catch(err => {
        logger.error(`Unable to do database update: ${err}`);
    });
};
