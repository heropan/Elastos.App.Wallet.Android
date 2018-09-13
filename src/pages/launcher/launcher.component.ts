import {Component, OnInit} from '@angular/core';
import {WalletCreateComponent} from "../wallet/wallet-create/wallet-create.component";
import {ImportComponent} from "../wallet/import/import.component";
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'app-launcher',
  templateUrl: './launcher.component.html',
})
export class LauncherComponent {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalltelistPage');
  }

  onNext(type) {
    if (type === 1) {
      this.navCtrl.push(WalletCreateComponent);
    } else {
      this.navCtrl.push(ImportComponent);
    }
  }
}
