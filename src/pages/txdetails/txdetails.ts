import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PopupProvider} from "../../providers/popup";
import {Util} from "../../providers/Util";
import {Native} from "../../providers/Native";
import {ScancodePage} from '../../pages/scancode/scancode';
@Component({
  selector: 'page-txdetails',
  templateUrl: 'txdetails.html',
})
export class TxdetailsPage {
  public txDetails ={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public popupProvider:PopupProvider,public native:Native) {
    this.txDetails = this.navParams.data['txContent'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TxdetailsPage');
  }

  nextPage(){
     this.getPassWord();
  }

  getPassWord(){
    this.popupProvider.presentPrompt().then((data)=>{
     if(Util.isNull(data)){
       this.native.toast_trans("text-id-kyc-prompt-password");
       return;
     }
     this.txDetails["password"] = data;
     this.native.Go(this.navCtrl,ScancodePage,{"txContent":JSON.stringify(this.txDetails)});
    }).catch(err=>{
      alert(JSON.stringify(err));
    })
  }

}
