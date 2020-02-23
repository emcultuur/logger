/**
 * Test the Object mapper
 */
const Chai = require('chai');
const assert = Chai.assert;
const Logger = require('../index');


describe('logger',  () => {
  it('errors', () => {
    let log = new Logger({toConsole : false});
    log.error('test', 'message');
    assert(log.hasErrors() === true, 'found the error');
    assert(log.errors.length === 1, 'just one');
    assert(log.errors[0].fieldName === 'test', 'got the name');
    assert(log.errors[0].message === 'message', 'and the message');
    log.error('test2', 'message2');
    assert(log.errors.length === 2, 'added one');
    assert(log.errors[1].fieldName === 'test2', 'at the end');
  });
  it('warnings', () => {
    let log = new Logger({toConsole : false});
    log.warn('test', 'message');
    assert(log.hasWarnings() === true, 'found the warning');
    assert(log.warnings.length === 1, 'just one');
    assert(log.warnings[0].fieldName === 'test', 'got the name');
    assert(log.warnings[0].message === 'message', 'and the message');
  });
  it('info', () => {
    let log = new Logger({toConsole : false});
    log.info('test', 'message');
    assert(log.infos.length === 1, 'just one');
    assert(log.infos[0].fieldName === 'test', 'got the name');
    assert(log.infos[0].message === 'message', 'and the message');
  });

  it('combine', () => {
    let log = new Logger({toConsole : false});
    log.info('test', 'message');
    log.warn('warn', 'warn message');
    log.error('error', 'err message');
    assert(log.infos.length === 1, 'just one');
    assert(log.warnings.length === 1, 'just one');
    assert(log.errors.length === 1, 'just one');
    assert(log.log.length === 3, 'all messages');
  });

  it('clear', () => {
    let log = new Logger({toConsole : false});
    log.info('test', 'message');
    assert(log.log.length === 1, 'has one');
    log.clear();
    assert(log.log.length === 0, 'empty');
  });

  it('execption', () => {
    let logDev = new Logger({toConsole: false, develop: true});
    let log = new Logger({toConsole: false});
    // should NOT write to console
    log.exception(new Error('nothing is wrong'));
    assert(log.errors.length === 1, 'has one');
   console.log('>>>>> should write an error to console. Do if you see the error, its ok');
    logDev.exception(new Error('some is wrong'));
    assert(log.errors.length === 1, 'has one');
  });

  it('pipe', () => {
    let log1 = new Logger({toConsole: false});
    let log = new Logger({toConsole: false, pipe: log1});
    log.info('some field', 'what');
    assert.equal(log1.log.length, 1, 'has one message');
    assert.equal(log.log.length, 1, 'has one message');
    log.pipe = false;
    log.info('some field', 'some more');
    assert.equal(log1.log.length, 1, 'has one message');
    assert.equal(log.log.length, 2, 'has two message');

  })


});
