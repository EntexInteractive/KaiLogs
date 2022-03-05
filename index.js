const fs = require('fs');
var path = require('path');
let filePath = null;

exports.createLog = function (path) {
    filePath = path;

    var create = fs.createWriteStream(filePath + "/latest.log");
    create.end();
}

exports.loadLog = function (path) {
    filePath = path;

    if (!fs.existsSync(filePath)){
        fs.mkdirSync(filePath);
    }

    if(!fs.existsSync(filePath + "/latest.log")) {

        console.log(`[${GetTime()}] [KaiLogs/WARN]: No log found. Creating a new one.`)

        var create = fs.createWriteStream(filePath + "/latest.log");
        create.end();
    }
}

exports.deleteLog = function (path) {
    if(fs.existsSync(path)) {
        fs.unlinkSync(path);        
    }
    else {
        console.log(`[${GetTime()}] [KaiLogs/WARN]: File not found.`);
    }
}

exports.error = function (message, where) {
    if(message == null || message == undefined) {
        throw new Error("[NO_MESSAGE]: message cannot be null");
    }
    if(filePath == null || filePath == undefined) {
        throw new Error("[NO_ACTIVE_LOG]: log file not found")
    }
    if(where == undefined) {
        where = "main";
    }

    var logMessage = `[${GetTime()}] [${where}/ERROR]: ${message}`;
    console.log(logMessage);

    fs.appendFile(filePath + "/latest.log", logMessage + "\n", function(err) {
        if(err) {
            throw new Error(err);
        }
    })
}

exports.log = function (message, where) {
    if(message == null || message == undefined) {
        throw new Error("[NO_MESSAGE]: message cannot be null");
    }
    if(filePath == null || filePath == undefined) {
        throw new Error("[NO_ACTIVE_LOG]: log file not found")
    }
    if(where == undefined) {
        where = "main";
    }

    var logMessage = `[${GetTime()}] [${where}/INFO]: ${message}`;
    console.log(logMessage);

    fs.appendFile(filePath + "/latest.log", logMessage + "\n", function(err) {
        if(err) {
            throw new Error(err);
        }
    })
}

exports.save = function (name) {
    if(name == undefined)
    {
        if (!fs.existsSync(`${filePath}/${GetMonth()}`)){
            fs.mkdirSync(`${filePath}/${GetMonth()}`);
        }

        if(fs.existsSync(`${filePath}/${GetMonth()}/${GetDate()}.log`)) {
            console.log(`[${GetTime()}] [KaiLogs/WARN]: Log file not saved. A log already exists with that name.`);
        }
        else
        {
            fs.renameSync(`${filePath}/latest.log`, `${filePath}/${GetMonth()}/${GetDate()}.log`);
            console.log(`[${GetTime()}] [KaiLogs/SAVE]: Saved the log as '${GetDate()}.log'`);
        }
    }
    else if(name != undefined)
    {
        if (!fs.existsSync(`${filePath}/${GetMonth()}`)){
            fs.mkdirSync(`${filePath}/${GetMonth()}`);
        }

        if(fs.existsSync(`${filePath}/${GetMonth()}/${name}-${GetDate()}.log`)) {
            console.log(`[${GetTime()}] [KaiLogs/WARN]: Log file not saved. A log already exists with that name.`);
        }
        else
        {
            fs.renameSync(`${filePath}/latest.log`, `${filePath}/${GetMonth()}/${name}-${GetDate()}.log`);
            console.log(`[${GetTime()}] [KaiLogs/SAVE]: Saved the log as '${name}-${GetDate()}.log'`);
        }
    }
}

exports.warn = function (message, where) {
    if(message == null || message == undefined) {
        throw new Error("[NO_MESSAGE]: message cannot be null");
    }
    if(filePath == null || filePath == undefined) {
        throw new Error("[NO_ACTIVE_LOG]: log file not found")
    }
    if(where == undefined) {
        where = "main";
    }

    var logMessage = `[${GetTime()}] [${where}/WARN]: ${message}`;
    console.log(logMessage);

    fs.appendFile(filePath + "/latest.log", logMessage + "\n", function(err) {
        if(err) {
            throw new Error(err);
        }
    })
}

exports.write = function (message, where, type) {
    if(message == null || message == undefined) {
        throw new Error("[NO_MESSAGE]: message cannot be null");
    }
    if(type == undefined) {
        type = "DEBUG";
    }
    if(where == undefined) {
        where = "main";
    }

    var logMessage = `[${GetTime()}] [${where}/${type}]: ${message}`;
    console.log(logMessage);
}

exports.overwrite = function() {
    if (!fs.existsSync(`${filePath}/${GetMonth()}`)){
        fs.mkdirSync(`${filePath}/${GetMonth()}`);
    }

        fs.renameSync(`${filePath}/latest.log`, `${filePath}/${GetMonth()}/${GetDate()}.log`);
        console.log(`[${GetTime()}] [KaiLogs/SAVE]: Saved the log as '${GetDate()}.log'`);
}

function GetDate()
{
    var today = new Date();
    var wrongMonth = ("0" + today.getMonth()).slice(-2);
    var month = parseInt(wrongMonth) + 1;
    var day = ("0" + today.getDate()).slice(-2);
    var year = today.getFullYear();
    return year + "-" + month + "-" + day;
}

function GetMonth()
{
    var today = new Date();
    var month = month = today.toLocaleString('default', { month: 'long' });
    return month;
}

// function GetTime()
// {
//     var time = new Date();
//     hours = ("0" + time.getHours()).slice(-2);
//     var minutes = new Date().getMinutes();
//     minutes = ("0" + time.getMinutes()).slice(-2);
//     var seconds = new Date().getSeconds();
//     seconds = ("0" + time.getSeconds()).slice(-2);
//     return hours + ":" + minutes + ":" + seconds
// }

function GetTime()
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