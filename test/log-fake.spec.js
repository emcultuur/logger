/**
 * Test the Object mapper
 */
const Chai = require('chai');
const assert = Chai.assert;
const Logger = require('../index');
const LogFake = require('../index').LogFake;

describe('LogFake',  () => {

  it('check the pipe - errors', () => {
    let log = new Logger({toConsole : false});
    let fake = new LogFake();
    fake.pipe = log
    fake.error('test', 'message');
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
    let fake = new LogFake();
    fake.pipe = log
    fake.warn('test', 'message');
    assert(log.hasWarnings() === true, 'found the warning');
    assert(log.warnings.length === 1, 'just one');
    assert(log.warnings[0].fieldName === 'test', 'got the name');
    assert(log.warnings[0].message === 'message', 'and the message');
  });
  it('info', () => {
    let log = new Logger({toConsole : false});
    let fake = new LogFake();
    fake.pipe = log
    fake.info('test', 'message');
    assert(log.infos.length === 1, 'just one');
    assert(log.infos[0].fieldName === 'test', 'got the name');
    assert(log.infos[0].message === 'message', 'and the message');
  });

})
