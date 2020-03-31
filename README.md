# Logger

version: 0.4

To log exception the log.exception(error, msg is added);
In production the exception are not send to the console. To send the info to the console use:
```javascript
    const Logger = require('logger');
    
    let log = new Logger({develop: true});
    // or in winston
    const WinstonLogger = require('LogWinston');   
    let lw = new WinstonLogger({
      develop: true, 
      transports:[
         {
           type: 'console',
           level: 'info'  
         } 
       ]})
```

# Decorator
To adjust the message store, a decorator can be used. The decorator is declared as:
```javascript
const Logger = require('LogWinston');

let log = new Logger({ transports:[
    {
      type: 'console',
      level: 'info'  
    }
  ],
  decorator: (msg) => { return 'the message was: ' + msg } 
})
```


# LogWinston

```javascript
const Logger = require('LogWinston');

let log = new Logger({ transports:[
  {
    type: 'console',
    level: 'info'  
  } 
]})

```



##  create options
- maxMessage => limit the number of messages remberd in the log()
- transports => array of log types

## Log types

### general
Every trans can have the properties:
- env => only load the transport if the env equal the current process.env
- notEnv => only load this transport if env doe NOT equal the current process.env
- multiple transport can be loaded at once


### console
Write the information direct to the console.
properties:
- level => what level to write (debug, info, warn, error)
- colorize => should give some color to it

example:
```javascript
let cons = {
  type: 'console',
  level: 'info',
  colorize: true
}
let logger = new LogWinston({ transports: [cons]})
```

###file
Write the information to a file.
properties:
- level => what level to write (debug, info, warn, error)
- filename => the full path to the file

example:
```javascript
let file = {
  type: 'file',
  level: 'info',
  filename: Path.join(__dirname, '../logging/error.log')
}
let logger = new LogWinston({ transports: [file]})
```

###loggly
Write the information to a file.
properties:
- level => what level to write (debug, info, warn, error)
- token => the Loggly Token to to log to
- subdomai => what domain is retrieving the info (required)
- tags => array | string: how to tag the message
- isJson => bool: true store as json (default true)
- meta => array: the meta tags added
example:
```javascript
let loggly = {
  type: 'loggly',
  level: 'warn',
  token: 'xxxxxxxxxxxx',
  subdomain: 'log-test',
  tags: ['loginfo', 'work']
}
let logger = new LogWinston({ transports: [loggly]})
```

###slack
Write the information to a slack channel.

[How to create a Slack webhook](https://api.slack.com/messaging/webhooks)

properties:
- level => what level to write (debug, info, warn, error)
- url => the webhook url of the slack channel
- channel => the channel to write to
- username => the username shown

example:
```javascript
let slack = {
  type: 'slack',
  level: 'error',
  url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
  channel: 'development',
  username: 'testApi'
}
let logger = new LogWinston({ transports: [slack]})
```


###mail
Send a mail when logging
properties:
- level => what level to write (debug, info, warn, error)
- host => required. the mail server to use to send the information
- port => 25: what port to use
- username => username to login on to mailserver
- password => password to login in
- to => who whill recieve the mail
- from => who is sending
- secure => is mail secure
- silent => nothing is show on the console

example:
```javascript
let mail = {
  type: 'mail',
  level: 'error',
  host: 'smtp.example.com',
  username: 'john@example.com',
  password: 'thisIsSecret',
  to: 'errorLog@example.com',
  from: 'test-api@example.com'
}
let logger = new LogWinston({ transports: [mail]})
```

##License
MIT

&copy; 2019-2020 EM-Cultuur
