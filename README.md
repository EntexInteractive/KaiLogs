# KaiLogs
Local logging library for Discord.js bots.
Designed for KaiBot and Quentin Discord Applications.

Turn this:
```
Hey this needs to be logged!
```
Into this:
```
[11:44:55PM] [<location>/INFO]: Hey this needs to be logged!
```

## Full documentation can be found [here](https://github.com/TheGuitarleader/KaiLogs/wiki)


## JavaScript Usage for KaiLogs@4.x.x+

### Create logger
We need to create a new logger with a directory to put the logs.
```javascript
const KaiLogs = require('kailogs');
const logger = new KaiLogs.logger('./logs');
```

### Error handling
KaiLogs can now log uncaught exceptions and rejections.
```javascript
const exception = new KaiLogs.exceptions(logger);
const rejection = new KaiLogs.rejections(logger);
```
After this we need to tell KaiLogs to start handling error events.
```javascript
exception.handle();
rejection.handle();
```
These can be turned off at anytime using the `unhandle()` method.

### Logging levels
KaiLogs has 6 logging levels. Each type of level has its own method.
| Name          | Example      | Usage
| ---------| ----------------| -----------
| `debug` | `logger.debug(message)` | 'message' : string of the message to be logged.
| `error` | `logger.error(message)` | 'message' : string of the message to be logged.
| `info` | `logger.info(message)` | 'message' : string of the message to be logged.
| `log`  | `logger.log(type, message)` | 'type' : custom level type string, 'message' : string of the message to be logged.
| `warn` | `logger.warn(message)` | 'message' : string of the message to be logged.

The `logger.message()` method is intended to log Discord messages for moderation purposes. Requires a [`channel.name`](https://discord.js.org/#/docs/discord.js/stable/class/Channel), [`user.username`](https://discord.js.org/#/docs/discord.js/stable/class/User), and [`message.content`](https://discord.js.org/#/docs/discord.js/stable/class/Message) class. 

### Events

As of KaiLogs@4.1.x, events will emit for each logging level.
```javascript
logger.on('error', (err) => {
    // Emits every time 'logger.error()' is called.
})
```


## JavaScript Usage for KaiLogs@3.x.x

```javascript
const logger = require('kailogs');

// Loads the latest log and continues the logging
logger.loadLog('../logs');

// Writes to log file and prints to console
logger.debug('debug');
logger.error('this is a error');
logger.log('this is a log');
logger.warn('this is a warning');

// Saves file as current date
logger.save();

// Creates a new log file
logger.createLog('../logs');

// Writes only to the console
logger.write('this is not logged', 'function');
```
