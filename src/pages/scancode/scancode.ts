import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Native} from "../../providers/Native";


@Component({
  selector: 'page-scancode',
  templateUrl: 'scancode.html',
})
export class ScancodePage {
  public qrcode: string=null;
  constructor(public navCtrl: NavController, public navParams: NavParams,public native: Native) {
           this.qrcode = JSON.stringify(this.navParams.data);
           this.native.info(this.navParams.data);
  }

  ionViewDidLoad() {

  }

}
