# KaiLogs
Logging library for KaiBot Discord Applications

Turn this:
```
Hey this needs to be logged!
```
Into this:
```
[23:44:55] [main/INFO]: Hey this needs to be logged!
```

```
   Time    Where/Type      Message
[23:44:55] [main/INFO]: Hey this needs to be logged!
```

## JavaScript Usage

```javascript
const logger = require('kailogs');

// Loads the latest log and continues the logging
logger.loadLog("../logs");

// Writes to log file and prints to console
logger.log("Hey this needs to be logged!", 'main', 'INFO');

// Saves file as current date and creates a new one
logger.save();

// Creates a new log file
logger.createLog("../logs");

// Writes just to the console
logger.write("Saved the log!", 'main', 'INFO');
```
