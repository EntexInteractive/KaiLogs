const fs = require('fs');
let filePath = null;

exports.createLog = function (path) {
    filePath = path;

    var create = fs.createWriteStream(filePath + "/latest.log");
    create.end();
}

exports.log = function (message, where, type) {
    if(message == null || message == undefined) {
        throw new Error("[NO_MESSAGE]: message cannot be null");
    }
    if(filePath == null || filePath == undefined) {
        throw new Error("[NO_ACTIVE_LOG]: log file not created")
    }
    if(type == undefined) {
        type = "DEBUG";
    }
    if(where == undefined) {
        where = "main";
    }

    console.log(filePath);

    var logMessage = `[${GetTime()}] [${where}/${type}]: ${message}`;
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

exports.save = function () {
    console.log("save")
    fs.renameSync(filePath + "/latest.log", filePath + "/" + GetDate() + ".log");
}

function GetDate()
{
    var today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var year = today.getFullYear();
    return year + "-" + month + "-" + day;
}

function GetTime()
{
    var time = new Date();
    hours = ("0" + time.getHours()).slice(-2);
    var minutes = new Date().getMinutes();
    minutes = ("0" + time.getMinutes()).slice(-2);
    var seconds = new Date().getSeconds();
    seconds = ("0" + time.getSeconds()).slice(-2);
    return hours + ":" + minutes + ":" + seconds
}