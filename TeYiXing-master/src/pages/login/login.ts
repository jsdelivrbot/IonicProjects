import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  AlertController,
  Events,
} from 'ionic-angular'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

import { Logger, LoggingService } from 'ionic-logging-service'

import {
  AuthService,
  LoginParams,
  LoginResult,
} from '../../shared/services/auth-service'
import { StorageService } from '../../shared/services/storage-service'
import { AppUser } from '../../shared/models/user'
import { EVENT_ACCOUNT_LOGIN } from '../../shared/models/consts'

const HOME_PAGE = 'HomePageComponent'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPageComponent {
  log: Logger
  loginForm: FormGroup
  passwordType = 'password'
  passwordShown = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private auth: AuthService,
    loggingService: LoggingService,
    private storageService: StorageService,
    private events: Events,
  ) {
    this.log = loggingService.getLogger('LoginPageComponent')
    this.hideMenu()
    this.createForm()
  }

  hideMenu() {
    this.menuCtrl.swipeEnable(false)
    this.menuCtrl.enable(false)
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      emailPhone: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    })
  }

  login() {
    const methodName = 'login'
    const loginParams: LoginParams = {
      LoginName: this.loginForm.value.emailPhone,
      Password: this.loginForm.value.password,
    }

    this.auth.login(loginParams).subscribe(
      result => {
        this.log.trace(methodName, result)
        const user = this.getUser(result)
        this.storageService
          .saveUser(user)
          .then(() => {
            this.log.trace(methodName, '成功保存登录用户信息。')
            this.events.publish(EVENT_ACCOUNT_LOGIN)
            this.navCtrl.setRoot(HOME_PAGE)
          })
          .catch(err => {
            this.log.error(methodName, err)
            this.showErrorAlert('保存用户信息错误，请重试！')
          })
      },
      error => this.showErrorAlert(error),
    )
  }

  getUser(result: LoginResult): AppUser {
    const {
      Token,
      EmployeeId,
      EmployeeName,
      Mobile,
      Email,
      IsAdmin,
      IsGreenChannel,
    } = result

    return {
      Token,
      EmployeeId,
      EmployeeName,
      Mobile,
      Email,
      IsAdmin,
      IsGreenChannel,
    } as AppUser
  }

  resetPassword() {
    this.showResetAlert()
  }

  togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false
      this.passwordType = 'password'
    } else {
      this.passwordShown = true
      this.passwordType = 'text'
    }
  }

  showErrorAlert(error) {
    const message = error || '系统错误，请重试！'
    const alert = this.alertCtrl.create({
      title: '提示信息',
      message,
      buttons: [
        {
          text: '知道了',
          role: 'cancel',
        },
      ],
    })
    alert.present()
  }

  showResetAlert() {
    const prompt = this.alertCtrl.create({
      title: '重置密码',
      subTitle: '输入手机或邮箱',
      inputs: [
        {
          name: 'account',
          placeholder: '手机号/邮箱',
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancle',
        },
        {
          text: '重置',
          handler: data => {},
        },
      ],
    })
    prompt.present()
  }
}
