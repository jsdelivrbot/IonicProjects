import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { HttpService } from './http-service'
import { AppUser } from '../models/user'
import { HttpBaseResponse } from '../models/http'

const LOGIN_PATH = '/Account/Login'
const LOGOUT_PATH = '/Account/Logout'

export interface LoginParams {
  LoginName: string
  Password: string
  AppVersion?: string
  DeviceType?: string
  DeviceId?: string
  OSVersion?: string
}

export interface LoginResult extends AppUser, HttpBaseResponse {}

@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}

  login(loginParams: LoginParams): Observable<LoginResult> {
    return this.http.post(LOGIN_PATH, loginParams)
  }

  logout(): Observable<HttpBaseResponse> {
    return this.http.post(LOGOUT_PATH, {})
  }
}
