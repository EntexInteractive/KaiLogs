const KaiLogs = require('../lib/kailogs');
const logger = new KaiLogs.logger('../logs');
const except = new KaiLogs.exceptions(logger).handle();
new KaiLogs.rejections(logger).handle();

logger.on('debug', (err) => {
    console.log("Debug");
});

logger.on('info', (err) => {
    console.log("Info");
});

logger.on('error', (err) => {
    console.log("Error");
});

logger.on('warn', (err) => {
    console.log("Warn");
});

// Writes to log file and prints to console
logger.debug('debug');
logger.error('error');
logger.info('info');
logger.log('this is a log', 'test', 'test');
logger.warn('this is a warning');

// Saves file as current date
logger.save('Save');

// Writes only to the console
logger.write('this is not logged');