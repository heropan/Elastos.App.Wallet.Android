import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PopupProvider} from "../../../../providers/popup";
import {WalletManager} from "../../../../providers/WalletManager";
import {Native} from "../../../../providers/Native";
import {Util} from '../../../../providers/Util';
import {  Config } from '../../../../providers/Config';
import {ScancodePage} from '../../../../pages/scancode/scancode';

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
  public masterId:string ="1";
  public publickey:string = "";
  public curChain = "ELA";
  public fee:number = 0;
  public feePerKb:number = 10000;
  public walletInfo = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,public popupProvider: PopupProvider,public native :Native,public walletManager :WalletManager) {
    this.masterId = Config.getCurMasterWalletId();
    this.getPublicKeyForVote();
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VotemanagePage');
  }

  init(){
    this.walletManager.getMasterWalletBasicInfo(this.masterId,(data)=>{
                 if(data["success"]){
                    this.native.info(data);
                    let item = JSON.parse(data["success"])["Account"];
                    this.walletInfo = item;
                 }
    });
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
          this.native.showLoading().then(()=>{
                this.generateCancelProducerPayload();
          });
          //this.native.Go(this.navCtrl,'JoinvotelistPage');
}).catch(()=>{

});
      }
    });
  }


  getPublicKeyForVote(){
    this.walletManager.getPublicKeyForVote(this.masterId,this.curChain,(data)=>{
              this.native.info(data);
              if(data["success"]){
                this.publickey = data["success"];
              }
    });
  }

  generateCancelProducerPayload(){
     this.walletManager.generateCancelProducerPayload(this.masterId,this.curChain,this.publickey,this.passworld,(data)=>{
      this.native.info(data);
      if(data["success"]){
           this.createCancelProducerTransaction(data["success"]);
      }
     });
  }


  createCancelProducerTransaction(payloadJson){
       this.walletManager.createCancelProducerTransaction(this.masterId,this.curChain,"",payloadJson,"",false,(data)=>{
        this.native.info(data);
        if(data["success"]){
            this.getFee(data["success"]);
        }

       });
  }


  //计算手续费
 getFee(rawTransaction){
  this.walletManager.calculateTransactionFee(this.masterId,this.curChain,rawTransaction, this.feePerKb, (data) => {
    if(data['success']){
      this.native.hideLoading();
      this.native.info(data);
      this.fee = data['success'];
      this.popupProvider.presentConfirm(this.fee/Config.SELA).then(()=>{
              this.native.showLoading().then(()=>{
                this.updateTxFee(rawTransaction);
              });

      });
    }
  });
 }


 updateTxFee(rawTransaction){

  this.walletManager.updateTransactionFee(this.masterId,this.curChain,rawTransaction, this.fee,"",(data)=>{
    if(data["success"]){
     this.native.info(data);
     if(this.walletInfo["Type"] === "Multi-Sign" && this.walletInfo["InnerType"] === "Readonly"){
              this.readWallet(data["success"]);
              return;
     }
     this.singTx(data["success"]);
    }else{
     this.native.info(data);
    }
});
 }


 singTx(rawTransaction){
  this.walletManager.signTransaction(this.masterId,this.curChain,rawTransaction,this.passworld,(data)=>{
    if(data["success"]){
      this.native.info(data);
      if(this.walletInfo["Type"] === "Standard"){
           this.sendTx(data["success"]);
      }else if(this.walletInfo["Type"] === "Multi-Sign"){
          this.walletManager.encodeTransactionToString(data["success"],(raw)=>{
                   if(raw["success"]){
                    this.native.hideLoading();
                    this.native.Go(this.navCtrl,ScancodePage,{"tx":{"chianId":this.curChain,"fee":this.fee/Config.SELA, "raw":raw["success"]}});
                   }else{
                    this.native.info(raw);
                   }
          });
      }
     }else{
         this.native.info(data);
     }
  });
 }

 sendTx(rawTransaction){
  this.native.info(rawTransaction);
  this.walletManager.publishTransaction(this.masterId,this.curChain,rawTransaction,(data)=>{
    if(data['success']){
      this.native.hideLoading();
    }else{
      this.native.info(data);
    }
  });
 }

 readWallet(raws){
  this.walletManager.encodeTransactionToString(raws,(raw)=>{
    if(raw["success"]){
      this.native.hideLoading();
      this.native.Go(this.navCtrl,ScancodePage,{"tx":{"chianId":this.curChain,"fee":this.fee/Config.SELA, "raw":raw["success"]}});
    }
});
}


}
