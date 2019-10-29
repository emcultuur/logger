const Chai = require('chai');
const assert = Chai.assert;
const Path = require('path');

const LogWinston = require('../index').LogWinston;

describe('log-winston', () => {

  it('create console all', () => {
    let log = new LogWinston({
      transports: [
        {
          type: 'console'
        }
      ]
    });
    log.info('start', 'some info');
    log.error('error', 'hot line');
  });

  it('create console error', () => {
    let log = new LogWinston({
      transports: [
        {
          level: 'error',
          type: 'console'
        }
      ]
    });
    log.info('start', 'some info');
    log.error('error', 'hot line');
  });

  it('create file', () => {
    let log = new LogWinston({
      transports: [
        {
          type: 'file',
          filename: Path.join(__dirname, '../logfiles/info.log')
        }
      ]
    });
    log.info('start', 'some info');
    log.error('error', 'hot line');
  });

  it('to loggly', () => {
    let log = new LogWinston({
      transports: [
        {
          type: 'loggly',
          token: 'xxxxx',
          subdomain: 'test-env'
        }
      ]
    });
    log.info('start', 'some info');
    log.error('error', 'hot line');
  });

  // https://hooks.slack.com/services/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
  it('to slack', () => {
    let log = new LogWinston({
      transports: [
        {
          type: 'slack',
          url: 'https://hooks.slack.com/services/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',
        }
      ]
    });
    log.info('start', 'some info');
    log.error('error', 'hot line');
  })

});
