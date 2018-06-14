import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
import { Observable } from 'rxjs/Observable'
import { fromPromise } from 'rxjs/observable/fromPromise'

import { Events } from 'ionic-angular'

import { ConfigurationService } from 'ionic-configuration-service'
import { Logger, LoggingService } from 'ionic-logging-service'
import { StorageService } from './storage-service'
import { EVENT_HTTP_401 } from '../models/consts'

const headers = new HttpHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})

@Injectable()
export class HttpService {
  log: Logger
  apiUrl: string

  constructor(
    private http: HttpClient,
    private config: ConfigurationService,
    private loggingService: LoggingService,
    private storageService: StorageService,
    private events: Events,
  ) {
    this.log = loggingService.getLogger('HttpService')
    this.apiUrl = config.getValue<string>('apiUrl')
    this.log.trace('constructor', this.apiUrl)
  }

  get(url: string): Observable<any> {
    return this.request('GET', this.apiUrl + url)
  }

  post(url: string, body: any): Observable<any> {
    return this.request('POST', this.apiUrl + url, body)
  }

  // there are four types of returns:
  // 1. normal value, just return it
  // 2. application error, convert it to a string exception
  // 3. http 401 error, need to login
  // 4. other errors, just return the error
  request(verb: string, url: string, body?: any): Observable<any> {
    const methodName = 'request'
    this.log.trace(methodName, verb, url)
    const options = { headers, body }
    return fromPromise(this.appendToken(options)).pipe(
      mergeMap(() => {
        return this.http
          .request(verb, url, options)
          .pipe(map(this.checkValue.bind(this)))
      }),
      catchError(this.handleError.bind(this)),
    )
  }

  appendToken(options: any): Promise<void> {
    const methodName = 'appendToken'
    return this.storageService.getToken().then(token => {
      if (token) {
        this.log.trace(methodName, token)
        options.headers = options.headers.append('Token', token)
      } else {
        this.log.trace(methodName, 'No token in local storage.')
      }
    })
  }

  // don't log response because it could be huge and sensitive
  checkValue(res: any) {
    if (res.Code !== 0) {
      // throw application error
      throw res.Message
    }
    return res // success return
  }

  handleError(err) {
    this.log.debug('handleError', err)
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        err = '认证失效，请重新登录' // 401 error
        this.events.publish(EVENT_HTTP_401)
      } else {
        err = '网络错误，请稍后再试' // other http error
      }
    }
    return new ErrorObservable(err) // application error
  }
}
