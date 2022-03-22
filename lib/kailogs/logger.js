/**
 * Class that defines the logger instance.
 * 
 * (C) Enigma Software
 */

const fs = require('fs');
var EventEmitter = require('events');
const Events = require('./events');

class Logger extends EventEmitter {
    constructor(directory) {
        super();
        this.directory = directory;
        
        if (!fs.existsSync(directory)){
            fs.mkdirSync(directory);
        }

        if (!fs.existsSync(directory + "/Console")){
            fs.mkdirSync(directory + "/Console");
        }

        if (!fs.existsSync(directory + "/Messages")){
            fs.mkdirSync(directory + "/Messages");
        }
    }

    /**
     * Prints to the console and logs as debug'.
     * @param {string} message A message that gets logged.
     * @example Logger.debug("Debug!", "main")
     */
    debug = function (message) {
        if(message == null || message == undefined) {
            throw new Error("[NO_MESSAGE]: message cannot be null");
        }
        if(this.directory == null || this.directory == undefined) {
            throw new Error("[NO_ACTIVE_LOG]: log file not found")
        }
    
        var logMessage = `[${_GetTime()}] [${_GetCallerFile()}/DEBUG]: ${message}`;
        console.log(logMessage);
        this.emit(Events.Debug, message);
    
        fs.appendFile(`${this.directory}/Console/latest.log`, logMessage + "\n", function(err) {
            if(err) {
                throw new Error(err);
            }
        })
    }

    /**
     * Deletes a log file.
     * @param {string} path The path to a specific file.
     * @example KaiLogs.delete('./logs/latest.log')
     */
    delete = function (path) {
        if(fs.existsSync(path)) {
            fs.unlinkSync(path);        
        }
        else {
            console.log(`[${_GetTime()}] [KaiLogs/WARN]: File not found.`);
        }
    }

    /**
     * Prints to the console and logs as an error.
     * @param {Error} error A message that gets logged.
     * @example KaiLogs.error("Error!")
     */
    error = function (error) {
        if(error == null || error == undefined) {
            throw new Error("[NO_MESSAGE]: message cannot be null");
        }
        if(this.directory == null || this.directory == undefined) {
            throw new Error("[NO_ACTIVE_LOG]: log file not found")
        }
    
        var logMessage = `[${_GetTime()}] [${_GetCallerFile()}/ERROR]: ${error}`;
        console.log(logMessage);
        this.emit(Events.Error, error);
    
        fs.appendFile(`${this.directory}/Console/latest.log`, logMessage + "\n", function(err) {
            if(err) {
                throw new Error(err);
            }
        })
    }

    /**
     * Prints to the console and logs as a 'INFO'.
     * @param {string} message A message that gets logged.
     * @example KaiLogs.log("Log me!")
     */
    info = function (message) {
        if(message == null || message == undefined) {
            throw new Error("[NO_MESSAGE]: message cannot be null");
        }
        if(this.directory == null || this.directory == undefined) {
            throw new Error("[NO_ACTIVE_LOG]: log file not found")
        }
    
        var logMessage = `[${_GetTime()}] [${_GetCallerFile()}/INFO]: ${message}`;
        console.log(logMessage);
        this.emit(Events.Info, message);
    
        fs.appendFile(`${this.directory}/Console/latest.log`, logMessage + "\n", function(err) {
            if(err) {
                throw new Error(err);
            }
        })
    }

    /**
     * Logs as a custom level type.
     * @param {string} message A message that gets logged.
     * @param {string} type The level of the log.
     * @param {string} where Where the message took place. Default: 'filename'
     * @example KaiLogs.log("INFO", "Log me!")
     */
    log = function (message, type, where) {
        if(message == null || message == undefined) {
            throw new Error("[NO_MESSAGE]: message cannot be null");
        }
        if(this.directory == null || this.directory == undefined) {
            throw new Error("[NO_ACTIVE_LOG]: log file not found")
        }
        if(where == null || where == undefined) {
            where = _GetCallerFile();
        }
    
        var logMessage = `[${_GetTime()}] [${where}/${type}]: ${message}`;
        console.log(logMessage);
        this.emit(Events.Log, message);
    
        fs.appendFile(`${this.directory}/Console/latest.log`, logMessage + "\n", function(err) {
            if(err) {
                throw new Error(err);
            }
        })
    }

    /**
     * Logs a Discord message object.
     * @param {string} channel The channel name to be logged.
     * @param {string} user The user name to be logged.
     * @param {string} message The message content to me logged.
     * @example KaiLogs.message("Channel", "User", "Message")'
     */
    message = function (channel, user, message) {
        if(message == null || message == undefined) {
            throw new Error("[NO_MESSAGE]: message cannot be null");
        }
        if(this.directory == null || this.directory == undefined) {
            throw new Error("[NO_ACTIVE_LOG]: log file not found")
        }
    
        var logMessage = `[${_GetTime()}] [${channel}] (${user}): ${message}`;
        console.log(logMessage);
    
        fs.appendFile(`${this.directory}/Messages/latest.log`, logMessage + "\n", function(err) {
            if(err) {
                throw new Error(err);
            }
        })
    }

    /**
     * Saves the loaded log.
     * @param {string} name Name of the file.
     * @example KaiLogs.save() saves as 'YYYY-MM-DD.log'
     * @example KaiLogs.save('Restart') saves as 'Restart-YYYY-MM-DD.log'
     */
    save = function (name) {
        if (!fs.existsSync(`${this.directory}/Console/${_GetMonth()}`)){
            fs.mkdirSync(`${this.directory}/Console/${_GetMonth()}`);
        }
    
        if (!fs.existsSync(`${this.directory}/Messages/${_GetMonth()}`)){
            fs.mkdirSync(`${this.directory}/Messages/${_GetMonth()}`);
        }

        if(name == undefined)
        {       
            if(fs.existsSync(`${this.directory}/Console/latest.log`)) {
                fs.renameSync(`${this.directory}/Console/latest.log`, `${this.directory}/Console/${_GetMonth()}/${_GetDate()}.log`);
                this.log(`Saved the console log as '${_GetDate()}.log'`, 'SAVE', 'KaiLogs');
            }
        
            if(fs.existsSync(`${this.directory}/Messages/latest.log`)) {
                fs.renameSync(`${this.directory}/Messages/latest.log`, `${this.directory}/Messages/${_GetMonth()}/${_GetDate()}.log`);
                this.log(`Saved the message log as '${_GetDate()}.log'`, 'SAVE', 'KaiLogs');
            }
        }
        else if(name != undefined)
        {
            if(fs.existsSync(`${this.directory}/Console/latest.log`)) {
                if(!fs.existsSync(`${this.directory}/Console/${_GetMonth()}/${name}-${_GetDate()}.log`)) {
                    fs.renameSync(`${this.directory}/Console/latest.log`, `${this.directory}/Console/${_GetMonth()}/${name}-${_GetDate()}.log`);
                    this.log(`Saved the console log as '${name}-${_GetDate()}.log'`, 'SAVE', 'KaiLogs');
                }
                else {
                    this.log(`Log file not saved. A log already exists with that name.`, 'WARN', 'KaiLogs');
                }
            }

            if(fs.existsSync(`${this.directory}/Messages/latest.log`)) {
                if(!fs.existsSync(`${this.directory}/Messages/${_GetMonth()}/${name}-${_GetDate()}.log`)) {
                    fs.renameSync(`${this.directory}/Messages/latest.log`, `${this.directory}/Messages/${_GetMonth()}/${name}-${_GetDate()}.log`);
                    this.log(`Saved the message log as '${name}-${_GetDate()}.log'`, 'SAVE', 'KaiLogs');
                }
                else {
                    this.log(`Log file not saved. A log already exists with that name.`, 'WARN', 'KaiLogs');
                }
            }
        }
    }

    /**
     * Prints to the console and logs as a warning.
     * @param {string} message A message that gets logged.
     * @example Logger.warn("Warning!")
     */
    warn = function (message) {
        if(message == null || message == undefined) {
            throw new Error("[NO_MESSAGE]: message cannot be null");
        }
        if(this.directory == null || this.directory == undefined) {
            throw new Error("[NO_ACTIVE_LOG]: log file not found")
        }
    
        var logMessage = `[${_GetTime()}] [${_GetCallerFile()}/WARN]: ${message}`;
        console.log(logMessage);
        this.emit(Events.Warn, message);
    
        fs.appendFile(`${this.directory}/Console/latest.log`, logMessage + "\n", function(err) {
            if(err) {
                throw new Error(err);
            }
        })
    }

    /**
     * Only prints to the console. Does not get logged.
     * @param {string} message A message that gets printed.
     * @example Logger.write("Don't log this!")
     */
    write = function (message) {
        if(message == null || message == undefined) {
            throw new Error("[NO_MESSAGE]: message cannot be null");
        }
        if(this.directory == null || this.directory == undefined) {
            throw new Error("[NO_ACTIVE_LOG]: log file not found")
        }
    
        var logMessage = `[${_GetTime()}] [${_GetCallerFile()}/WARN]: ${message}`;
        console.log(logMessage);
    }

    _increaseMaxListeners() {
        const maxListeners = this.getMaxListeners();
        if(maxListeners !== 0) {
            this.setMaxListeners(maxListeners + 1)
        }
    }

    _decreaseMaxListeners() {
        const maxListeners = this.getMaxListeners();
        if(maxListeners !== 0) {
            this.setMaxListeners(maxListeners - 1)
        }
    }
}

function _GetTime()
{
    var d = new Date();
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
      h = hh - 12;
      dd = "PM";
    }
    if (h == 0) {
      h = 12;
    }
    m = m < 10 ? "0" + m : m; 
    s = s < 10 ? "0" + s : s;
    h = h<10?"0"+h:h;
  
    var time = `${h}:${m}:${s}${dd}`;
  
    return time;
}

function _GetDate()
{
    var today = new Date();
    var wrongMonth = ("0" + today.getMonth()).slice(-2);
    var month = parseInt(wrongMonth) + 1;
    var day = ("0" + today.getDate()).slice(-2);
    var year = today.getFullYear();
    return year + "-" + month + "-" + day;
}

function _GetMonth()
{
    var today = new Date();
    var month = month = today.toLocaleString('default', { month: 'long' });
    return month;
}

// function _GetCallerFile() {
//     let path = require.main.filename;
//     let pathArray = path.split('\\');
//     let file = pathArray[pathArray.length - 1].slice(0, -3);
//     return file;
// }

function _GetCallerFile() {
    var filePath;

    var _pst = Error.prepareStackTrace
    Error.prepareStackTrace = function (err, stack) { return stack; };
    try {
        var err = new Error();
        var callerfile;
        var currentfile;

        currentfile = err.stack.shift().getFileName();

        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();

            if(currentfile !== callerfile) {
                filePath = callerfile;
                break;
            }
        }
    } catch (err) {}
    Error.prepareStackTrace = _pst;

    var path = filePath.split('/');
    if(path.length <= 1) {
        path = filePath.split('\\');
    }

    var filename = path[path.length - 1].slice(0, -3);
    return filename;
}

module.exports = Logger;