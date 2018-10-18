import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';
import {Config} from "../../providers/Config";
import {Native} from "../../providers/Native";
@Component({
  selector: 'page-paymentbox',
  templateUrl: 'paymentbox.html',
})
export class PaymentboxPage {
  public SELA = Config.SELA;
  public toAddress = "";
  public transfer: any = {
    toAddress: '',
    amount: '',
    memo: '',
    fee:0,
    payPassword:'',//hptest
    remark:'',
    rate:''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public native:Native) {
            this.transfer = this.navParams.data;
            if(this.transfer["rate"]){
               this.toAddress = this.transfer["accounts"];
            }else{
               this.toAddress = this.transfer["toAddress"];
            }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentboxPage');
  }

  click_close(){
    this.viewCtrl.dismiss(null);
  }

  click_button(){
    //this.viewCtrl.dismiss(this.transfer);
    if(this.transfer.payPassword){
      this.viewCtrl.dismiss(this.transfer);
    }else{
      this.native.toast_trans('text-pwd-validator');
    }
  }

}
