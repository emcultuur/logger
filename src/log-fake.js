/**
 * Fake logging.
 *
 * Does nothing but save the trouble for checking is the logging is active
 * version 0.0.1  Jay 2020-01-18
 */

class LogFake extends Logger {


  exception(err, msg) {
  }

  error(fieldName, msg) {
  }

  warn(fieldName, msg) {
  }

  info(fieldName, msg) {
  }

}

module.exports = LoggerFake;
