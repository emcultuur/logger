
const Logger = require('./src/logger');
const LogWinston = require('./src/log-winston');
const LogFake = require('./src/log-fake');

module.exports = Logger;
module.exports.LogWinston = LogWinston;
module.exports.LogFake = LogFake;
