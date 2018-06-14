import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HomePageComponent } from './home'

@NgModule({
  declarations: [HomePageComponent],
  imports: [IonicPageModule.forChild(HomePageComponent)],
})
export class HomePageModule {}
