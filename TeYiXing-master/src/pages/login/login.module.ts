import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { LoginPageComponent } from './login'

@NgModule({
  declarations: [LoginPageComponent],
  imports: [IonicPageModule.forChild(LoginPageComponent)],
})
export class LoginPageModule {}
