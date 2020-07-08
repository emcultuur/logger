/**
 * Fake logging.
 *
 * Does nothing but save the trouble for checking is the logging is active
 * version 0.0.1  Jay 2020-01-18
 * version 0.1 Jay 2020-07-08 - uses pipe
 *
 */
const Logger = require('./logger');

class LoggerFake extends Logger {


  exception(err, msg) {
    this.checkPipe('exception', msg)
  }


  error(fieldName, msg) {
    this.checkPipe('error', fieldName, msg)
  }

  warn(fieldName, msg) {
    this.checkPipe('warn', fieldName, msg)
  }

  info(fieldName, msg) {
    this.checkPipe('info', fieldName, msg)
  }
  trace(msg) {
    this.checkPipe('trace', msg)
  }
}

module.exports = LoggerFake;
