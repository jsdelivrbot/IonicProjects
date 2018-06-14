import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
} from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePageComponent {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
  ) {
    this.menuCtrl.swipeEnable(true)
    this.menuCtrl.enable(true)
  }
}
