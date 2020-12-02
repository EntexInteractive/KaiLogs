const logger = require('kailogs');

// Loads the latest log and continues the logging
logger.loadLog("../logs");

// Writes to log file and prints to console
logger.log("Hey this needs to be logged!", 'main', 'INFO');

// Saves file as current date
logger.save();

// Creates a new log file
logger.createLog("../logs");

// Writes just to the console
logger.write("Saved the log!", 'main', 'INFO');