const logger = require('../index.js');

// Creates a new log file
logger.createLog("../logs");

// Writes to log file and prints to console
logger.log("Hey this needs to be logged!", 'main', 'INFO');

// Saves file as current date and creates a new one
logger.save();

// Writes just to the console
logger.write("Saved the log!", 'main', 'INFO');