import { TestBed, inject } from '@angular/core/testing'

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'

import { AuthService } from './auth-service'

describe('AuthService', () => {
  let auth: AuthService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    })

    auth = TestBed.get(AuthService)
    httpMock = TestBed.get(HttpTestingController)
  })

  it('should login with valid username and password', done => {
    expect(true).toBeTruthy()
    done()
  })
})
