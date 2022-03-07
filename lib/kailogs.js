/**
 * Top-level entry point for KaiLogs
 * 
 * (C) Enigma Software
 */

exports.exceptions = require('./kailogs/exceptions');

exports.logger = require('./kailogs/logger');

exports.rejections = require('./kailogs/rejections');

exports.version = require('../package.json').version;