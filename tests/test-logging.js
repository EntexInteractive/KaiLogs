const logger = require('../index.js');

// Loads the latest log and continues the logging
logger.loadLog('../logs');

// Writes to log file and prints to console
logger.debug('debug');
logger.error('this is a error');
logger.log('this is a log');
logger.warn('this is a warning');

// Saves file as current date
logger.save('Restart');

// Creates a new log file
logger.createLog('../logs');

// Writes only to the console
logger.write('this is not logged', 'function');
