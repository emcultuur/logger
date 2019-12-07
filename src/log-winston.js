
const Logger = require('./logger');
const Winston = require('winston');
const {Loggly} = require('winston-loggly-bulk');
const SlackHook = require("winston-slack-webhook-transport");
const Mail = require('winston-mail');

class LogWinston extends Logger {

  constructor(options) {
    options.toConsole = false;
    super(options);
    let transports = [];
    if (options.transports) {
      for (let l = 0; l < options.transports.length; l++) {
        let trans = options.transports[l];
        if (trans.env && trans.env !== process.env.NODE_ENV) {
          continue;  // skip if env does not match
        }
        if (trans.noEnv && trans.notEnv === process.env.NODE_ENV) {
          continue;  // skip if env does match
        }

        switch (trans.type) {
          case 'console':
            transports.push(new Winston.transports.Console({
              level: trans.level === undefined ? 'info' : trans.level,
              colorize: trans.colorize === undefined ? true : trans.colorize
            }));
            break;
          case 'file':
            if (trans.filename === undefined) {
              throw new Error(`missing filename for file[${l}'`);
            }
            transports.push(new Winston.transports.File({
              level: trans.level === undefined ? 'info' : trans.level,
              filename: trans.filename
            }));
            break;
          case 'loggly':
            if (trans.token === undefined) {
              console.warn('missing token for loggly');
            } else {
              transports.push(new Loggly({
                level: trans.level === undefined ? 'info' : trans.level,
                token: trans.token,
                subdomain: trans.subdomain,
                tags: Array.isArray(trans.tags) ? trans.tags : [trans.tags],
                json: trans.isJson === undefined ? true : trans.isJson,
                meta: trans.meta === undefined ? '' : trans.meta,
              }));
            }
            break;
          case 'slack':
            transports.push(new SlackHook({
              webhookUrl: trans.url,
              channel: trans.channel === undefined ? 'logger' : trans.channel,
              username: trans.username === undefined ? 'logger' : trans.username,
              level: trans.level === undefined ? 'info' : trans.level,
            }));
            break;
          case 'mail':
            if (!trans.host || !trans.to) {
              console.warn(`missing host or to in log.mail`);
            } else {
              transports.push(new Mail({
                level: trans.level === undefined ? 'info' : trans.level,
                to: trans.to,
                from: trans.from === undefined ? 'info@example.com' : trans.from,
                host: trans.host,
                port: trans.port === undefined ? 25 : trans.port,
                secure: trans.secure === undefined ? false : trans.secure,
                username: trans.username,
                password: trans.password,
                silent: trans.silent === undefined ? false : trans.silent
              }))
            }
            break;
          default:
            console.warn(`unknown log type: ${trans.type}`);
        }
      }
    }
    this.logger = Winston.createLogger({
      transports
    });
    this._maxMessage = options.maxMessage === undefined ? 0 : options.maxMessage;
  }

  get winston() {
    return this._logger;
  }
  _log(what, fieldName, msg) {
    this.logger.log(what, `${fieldName} ${msg ? ' - ' + msg : ''}`);
    if (this._maxMessage) {
      super.error(fieldName, msg);
      if (this._maxMessage < this.log.length) {
        this.log.shift();
      }
    }
  }
  exception(error, msg) {
    this._log('error', 'execption',  msg);
    if (this._develop) {
      console.error(error);
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
