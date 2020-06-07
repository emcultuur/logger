/**
 * class to log errors, warning and info
 *
 * version 0.0.1 JvK 2019-08-22
 */

class Logger {

  constructor(options = {}) {
    this._toConsole = options.toConsole !== undefined ? !!options.toConsole : true;
    this._showTrace = options.hasOwnProperty('showTrace') ? !!options.showTrace : false;
    this._history = [];
    this._develop = options.develop === undefined ? false : !!options.develop;
    // function to decorate the text written to the log. For linenumber etc
    this._decorator = options.decorator;
    // connect multiple logger so we can have global and local logging
    this._pipe = options.pipe;
  }

  get toConsole() {
    return this._toConsole;
  }
  set toConsole(value) {
    this._toConsole = !! value;
  }
  get decorator() {
    return this._decorator;
  }
  set decorator(value) {
    this._decorator = value;
  }

  get develop() {
    return this.develop;
  }

  set develop(mode) {
    this._develop = !!mode;
  }

  get pipe() {
    return this._pipe;
  }
  set pipe(value) {
    this._pipe = value;
  }
  checkPipe(type, fieldName, msg) {
    if (this._pipe) {
      this._pipe[type](fieldName, msg);
    }
  }
  exception(err, msg) {
    this.error('exception', msg);
    if (this._develop) {
      console.error(err);
    }
  }

  error(fieldName, msg) {
    if (this._toConsole) {
      console.error(fieldName, msg);
    }
    this._history.push({type: 'error', fieldName: fieldName, message: this.decorator ? this.decorator(msg, {type: 'error'}) : msg})
    this.checkPipe('error', fieldName, msg)
  }

  warn(fieldName, msg) {
    if (this._toConsole) {
      console.warn(fieldName, msg);
    }
    this._history.push({type: 'warn', fieldName: fieldName, message: this.decorator ? this.decorator(msg, {type: 'warn'}) : msg})
    this.checkPipe('warn', fieldName, msg)
  }

  info(fieldName, msg) {
    if (this._toConsole) {
      console.info(fieldName, msg);
    }
    this._history.push({type: 'info', fieldName: fieldName, message: this.decorator ? this.decorator(msg, {type: 'info'}) : msg})
    this.checkPipe('info', fieldName, msg)
  }
  trace(msg) {
    if (this.showTrace) {
      console.info(`[trace] ${msg}`);
      this._history.push({type: 'trace',message: this.decorator ? this.decorator(msg, {type: 'info'}) : msg})
    }
  }

  get errors() {
    return this._history.filter( (log) => log.type === 'error') ;
  }
  get warnings() {
    return this._history.filter( (log) => log.type === 'warn') ;
  }
  get infos() {
    return this._history.filter( (log) => log.type === 'info') ;
  }
  get traces() {
    return this._history.filter( (log) => log.type === 'trace');
  }

  get log() {
    return this._history;
  }


  hasErrors() {
    return this.errors.length > 0 ;
  }
  hasWarnings() {
    return this.warnings.length > 0 ;
  }
  hasMessages() {
    return this._history.length > 0;
  }

  clear() {
    this._history = [];
  }


}

module.exports = Logger;
