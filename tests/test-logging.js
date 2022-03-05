const KaiLogs = require('../lib/kailogs');
const logger = new KaiLogs.logger('../logs');
new KaiLogs.exceptions(logger).handle();
new KaiLogs.rejections(logger).handle();

// Writes to log file and prints to console
logger.debug('debug');
logger.error('this is a error');
logger.log('test', 'this is a log');
logger.warn('this is a warning');

// Saves file as current date
logger.save('Save');

// Writes only to the console
logger.write('this is not logged');