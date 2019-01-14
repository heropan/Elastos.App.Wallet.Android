import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PopupProvider} from "../../../../providers/popup";
import {WalletManager} from "../../../../providers/WalletManager";
import {Native} from "../../../../providers/Native";
import {Util} from '../../../../providers/Util';

/**
 * Generated class for the VotemanagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-votemanage',
  templateUrl: 'votemanage.html',
})
export class VotemanagePage {
  public passworld:string = "";
  public masterWalletId:string ="1";
  public publicKey:string = "qwerttttt";
  constructor(public navCtrl: NavController, public navParams: NavParams,public popupProvider: PopupProvider,public native :Native,public walletManager :WalletManager) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VotemanagePage');
  }

  logout(){
    this.popupProvider.ionicConfirm('confirmTitle', 'log-out-subTitle').then((data) => {
      if (data) {
        this.popupProvider.presentPrompt().then((val)=>{
          if(Util.isNull(val)){
            this.native.toast_trans("text-id-kyc-prompt-password");
            return;
          }
          this.passworld = val.toString();
          //this.native.Go(this.navCtrl,'JoinvotelistPage');
}).catch(()=>{

});
      }
    });
  }


  sendCancelProducer(){
      // this.walletManager.createCancelProducerTransaction(this.masterWalletId,"ELA",this.publicKey,(data)=>{

      // });
  }
}
