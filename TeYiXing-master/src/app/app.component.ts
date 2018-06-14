import { Component, ViewChild } from '@angular/core'
import { Platform, Nav, Events } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

import { Logger, LoggingService } from 'ionic-logging-service'

import { StorageService } from '../shared/services/storage-service'
import { AuthService } from '../shared/services/auth-service'
import { concat, tap } from 'rxjs/operators'

import { EVENT_ACCOUNT_LOGIN, EVENT_HTTP_401 } from '../shared/models/consts'

export interface MenuItem {
  title: string
  component: any
  icon: string
}

const LOGIN_PAGE = 'LoginPageComponent'
const HOME_PAGE = 'HomePageComponent'

@Component({
  templateUrl: 'app.html',
})
export class MyAppComponent {
  log: Logger
  @ViewChild(Nav) nav: Nav
  rootPage = HOME_PAGE
  appMenuItems: Array<MenuItem>
  employeeName: string

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    loggingService: LoggingService,
    private storageService: StorageService,
    private authService: AuthService,
    private events: Events,
  ) {
    this.log = loggingService.getLogger('MyAppComponent')

    this.checkAccount()
    this.initMenu()
    this.subscribeEvents()

    platform.ready().then(() => {
      statusBar.styleDefault()
      splashScreen.hide()
    })
  }

  subscribeEvents() {
    const methodName = 'subscribeEvents'
    this.events.subscribe(EVENT_ACCOUNT_LOGIN, () => {
      this.log.trace(methodName, EVENT_ACCOUNT_LOGIN)
      this.checkAccount()
    })

    this.events.subscribe(EVENT_HTTP_401, () => {
      this.log.trace(methodName, EVENT_HTTP_401)
      this.nav.setRoot(LOGIN_PAGE)
    })
  }

  checkAccount() {
    const methodName = 'checkAccount'

    this.storageService
      .getUser()
      .then(user => {
        if (user) {
          this.employeeName = user.EmployeeName
          this.log.trace(methodName, 'Set employee name.', this.employeeName)
        } else {
          this.log.trace(methodName, 'Go to login page.')
          this.rootPage = LOGIN_PAGE
        }
      })
      .catch(err => {
        this.log.error(methodName, err)
        this.rootPage = LOGIN_PAGE
      })
  }

  initMenu() {
    this.appMenuItems = [
      { title: '主页', component: HOME_PAGE, icon: 'home' },
      { title: '行程', component: 'page-booking-list', icon: 'briefcase' },
      { title: '修改密码', component: 'page-profile', icon: 'key' },
      { title: '退出', component: LOGIN_PAGE, icon: 'log-out' },
    ]
  }

  openPage(page) {
    const methodName = 'openPage'
    this.log.trace(methodName, page)

    if (page.component === LOGIN_PAGE) {
      this.authService
        .logout()
        .pipe(
          tap(res => {
            this.checkAccount.bind(this)
            this.log.trace(methodName, 'logout from backend.')
          }),
          concat(
            this.storageService
              .deleteUser()
              .then(() =>
                this.log.trace(methodName, 'deleted user from storage.'),
              ),
          ),
        )
        .subscribe(
          () => {},
          err => this.log.debug(methodName, err),
          () => this.log.trace(methodName, 'User logout completed.'),
        )
    }
    this.nav.setRoot(page.component)
  }
}
