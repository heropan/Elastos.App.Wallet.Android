import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-scancode',
  templateUrl: 'scancode.html',
})
export class ScancodePage {
  public qrcode: string=null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
           this.qrcode = this.navParams.data["txContent"];
           console.log("=====this.qrcode====="+this.qrcode);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScancodePage');
  }

}
