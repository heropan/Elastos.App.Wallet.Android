import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import { PopupProvider } from '../../../../providers/popup';
import { Util } from '../../../../providers/Util';
import {Native} from "../../../../providers/Native";
import {  Config } from '../../../../providers/Config';
import {WalletManager} from '../../../../providers/WalletManager';

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
  public nodeName:string = "ssss";
  public publickey:string ="xxxxxxxx111111";
  public address:number = 1;
  public url:string ="https://www.baidu.com";
  public countrys = [];
  public masterId:string = "";
  public curChain = "ELA";
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public popupProvider:PopupProvider,public native:
    Native,public walletManager:WalletManager) {
       this.countrys = Config.getAllCountry();
       this.masterId = Config.getCurMasterWalletId();
       this.getPublicKeyForVote();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  election(){

    if(this.checkParms()){
        this.openPayModal();
    }
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

  checkParms(){

    if(Util.isNull(this.nodeName)){
       this.native.toast_trans('please-enter-node-name');
       return false;
    }

    if(Util.isNodeName(this.nodeName)){
       this.native.toast_trans('text-node-name-validator1');
       return false;
    }

    if(Util.isNull(this.url)){
      this.native.toast_trans('please-enter-node-url');
      return false;
    }

    return true;
  }

  getPublicKeyForVote(){
    this.walletManager.getPublicKeyForVote(this.masterId,this.curChain,(data)=>{
              this.native.info(data);
              if(data["success"]){
                this.publickey = data["success"];
              }
    });
  }

  generateProducerPayload(){
     this.walletManager.generateProducerPayload(this.masterId,this.curChain,this.publickey,this.nodeName,this.url,"",this.address,this.passworld,(data)=>{
      this.native.info(data);
      if(data["success"]){

      }
    });
  }

}
