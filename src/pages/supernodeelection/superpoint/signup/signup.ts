import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import { PopupProvider } from '../../../../providers/popup';
import { Util } from '../../../../providers/Util';
import {Native} from "../../../../providers/Native";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public passworld:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public popupProvider:PopupProvider,public native:
    Native) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  election(){
    this.openPayModal();
  }

  openPayModal(){
    const modal = this.modalCtrl.create("LockdetailsPage",{});
    modal.onDidDismiss(data => {
      if(data){
        this.popupProvider.presentPrompt().then((val)=>{
          if(Util.isNull(val)){
            this.native.toast_trans("text-id-kyc-prompt-password");
            return;
          }
          this.passworld = val.toString();
          this.native.Go(this.navCtrl,'JoinvotelistPage');
}).catch(()=>{

});
      }
    });
    modal.present();
  }

}
