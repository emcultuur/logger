
const Logger = require('./logger');
const Winston = require('winston');
const {Loggly} = require('winston-loggly-bulk');

class LogWinston extends Logger {

  constructor(options) {
    options.toConsole = false;
    super(options);
    let transports = [];
    if (options.transports) {
      for (let l = 0; l < options.transports.length; l++) {
        let file = options.transports[l];
        if (file.env && file.env !== process.env.NODE_ENV) {
          continue;  // skip if env does not match
        }
        if (file.noEnv && file.notEnv === process.env.NODE_ENV) {
          continue;  // skip if env does match
        }

        switch (file.type) {
          case 'console':
            transports.push(new Winston.transports.Console({
              level: file.level === undefined ? 'info' : file.level,
              colorize: file.colorize === undefined ? true : file.colorize
            }));
            break;
          case 'file':
            if (file.filename === undefined) {
              throw new Error(`missing filename for file[${l}'`);
            }
            transports.push(new Winston.transports.File({
              level: file.level === undefined ? 'info' : file.level,
              filename: file.filename
            }));
            break;
          case 'loggly':
            if (file.token === undefined) {
              console.warn('missing token for loggly');
            } else {
              transports.push(new Loggly({
                token: file.token,
                subdomain: file.subdomain,
                tags: Array.isArray(file.tags) ? file.tags : [file.tags],
                json: file.isJson === undefined ? true : file.isJson,
                meta: file.meta === undefined ? '' : file.meta,
              }));
            }
            break;
          default:
            console.warn(`unknown log type: ${file.type}`);
        }
      }
    }
    this.logger = Winston.createLogger({
      transports
    });
    this._maxMessage = options.maxMessage === undefined ? 0 : options.maxMessage;
  }

  _log(what, fieldName, msg) {
    this.logger.log(what, `${fieldName} - ${msg}`);
    if (this._maxMessage) {
      super.error(fieldName, msg);
      if (this._maxMessage < this.log.length) {
        this.log.shift();
      }
    }
  }
  error(fieldName, msg) {
    this._log('error', fieldName, msg);
  }

  warn(fieldName, msg) {
    this._log('warn', fieldName, msg);
  }

  info(fieldName, msg) {
    this._log('info', fieldName, msg);
  }
  debug(msg) {
    this._log('debug', '', msg);
  }
}

module.exports = LogWinston;
