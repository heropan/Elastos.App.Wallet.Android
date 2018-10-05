import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {Config} from "../../providers/Config";

@Component({
  selector: 'page-paymentbox',
  templateUrl: 'paymentbox.html',
})
export class PaymentboxPage {
  public SELA = Config.SELA;
  public transfer: any = {
    toAddress: '7d2883d021d2fdcea15757a98762edcec7d5185a',
    amount: '0.1',
    memo: '',
    fee: 10000,
    payPassword:'',//hptest
    remark:'',
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentboxPage');
  }

  click_close(){

  }

  click_button(){

  }

}
