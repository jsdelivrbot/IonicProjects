# Config and Log

This document describes the configuration and log utilities used in this application.

## Config

There are some setup steps to use [`ionic-configuration-service`](https://github.com/Ritzlgrmft/ionic-configuration-service). Instead of defining a new enviornment mode variable, the `IONIC_ENV` is used.

Install configuration service `npm i -S ionic-configuration-service`.

You need to copy the configuration file to build output folder in build process. Because copied files should have the same name, you need to put different environment configuration files into different folders.

Create a `/config/copy.config.js` with the following content:

```js
const ionicEnv = process.env.IONIC_ENV || 'dev'

module.exports = {
  copySettings: {
    src: ['{{ROOT}}/environments/' + ionicEnv + '/settings.json'],
    dest: '{{WWW}}/assets',
  },
}
```

Add the following lines to `package.json`:

```json
"config": {
  "ionic_copy": "./config/copy.config.js"
},
```

Load configuration data during Ionic bootstrapping.

```ts
import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER } from "@angular/core";
import { ConfigurationService } from "ionic-configuration-service";

export function loadConfiguration(configurationService: ConfigurationService): () => Promise<void> {
  return () => configurationService.load("assets/settings.json");
}

@NgModule({
  ...
  imports: [
    ...
    HttpClientModule,
  ],
  providers: [
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [ConfigurationService],
      multi: true
    },
    ....
  ]
})
```

To access to the configuration data, inject the `ConfigurationService` and call the `getValue` method:

```ts
constructor(
  private configurationService: ConfigurationService) {
}

const secretNumber = this.configurationService.getValue<number>("secretNumber")

// for complex configuration, use an interface
export interface LoggingConfiguration {
  logLevels?: {
    loggerName: string
    logLevel: string
   }[]
}

let configuration = this.configurationService.getValue<LoggingConfiguration>("logging")
```

## Log

### Installation

Install the log service `npm i -S ionic-logging-service`. It has 6 methods that log differnt level of messages: `trace`, `debug`, `info`, `warn`, `error` and `fatal`. There are four appenders: `BrowserConsoleAppender`, `AjaxAppender`,`MemoryAppender`, and `LocalStorageAppender`.

### Configuration

It uses the above configuration service to config log levels and appenders. The configuration syntax can be found in [`logging-service.configuration.ts`](https://github.com/Ritzlgrmft/ionic-logging-service/blob/master/src/logging-service.configuration.ts) and related configuration source files.

**Tips**: To see `DEBUG` and `TRACE` level messages, you need to change the filter level to `All levels` in Chrome Console.

```json
{
  "logging": {
    "logLevels": [
      {
        "loggerName": "root",
        "logLevel": "TRACE"
      }
    ],
    "browserConsoleAppender": {
      "threshold": "TRACE"
    }
  }
}
```

### Logging in Code

To use it, add `LogginService` to root injector.

```ts
import { LoggingService } from 'ionic-logging-service'

providers: [
  LoggingService,
  ...
]
```

Then inject and use it in code:

```ts
import { Logger, LoggingService } from "ionic-logging-service"

export class MyComponent {
  logger: Logger
  constructor(loggingService: LoggingService) {
    this.logger = loggingService.getLogger("MyApp.MyComponent")
  }

  public myMethod() {
    const methodName = "myMethod"
    this.logger.entry(methodName)
    try {
      ...
    } catch (e) {
      this.logger.error(methodName, "some error", e)
    }
    this.logger.exit(methodName)
  }
}
```
