import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PopupProvider} from "../../providers/popup";
import {Util} from "../../providers/Util";
import {Native} from "../../providers/Native";
import {ScancodePage} from '../../pages/scancode/scancode';
import {WalletManager} from '../../providers/WalletManager'
@Component({
  selector: 'page-txdetails',
  templateUrl: 'txdetails.html',
})
export class TxdetailsPage {
  public txDetails:any;
  public type:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public popupProvider:PopupProvider,public native:Native,public walletManager:WalletManager) {
    this.type = this.navParams.data["type"];
    this.txDetails = JSON.parse(this.navParams.data['content'])['txContent'];
    console.log("========this.txDetails=========="+JSON.stringify(this.txDetails));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TxdetailsPage');
  }

  nextPage(){
     if(this.type === 4){
        this.getPassWord();
     }else if(this.type === 3){
        this.sendTx(this.txDetails["masterWalletId"],this.txDetails["chianId"],this.txDetails["rawTransaction"]);
     }
  }

  getPassWord(){
    this.popupProvider.presentPrompt().then((data)=>{
     if(Util.isNull(data)){
       this.native.toast_trans("text-id-kyc-prompt-password");
       return;
     }

     this.singTx(this.txDetails["masterWalletId"],this.txDetails["chianId"],this.txDetails["rawTransaction"],data.toString());

    }).catch(err=>{
      alert(JSON.stringify(err));
    })
  }

  singTx(masterWalletId:string,chain:string,rawTransaction:string,payPassWord:string){
    this.walletManager.signTransaction(masterWalletId,chain,rawTransaction,payPassWord,(data)=>{
              if(data["success"]){
                this.native.Go(this.navCtrl,ScancodePage,{"txContent":JSON.stringify(this.txDetails)});
              }else{
                 alert("======signTransaction===error==="+JSON.stringify(data));
              }
    })
  }


  sendTx(masterWalletId:string,chain:string,rawTransaction:string){
      this.walletManager.publishTransaction(masterWalletId,chain,rawTransaction,(data)=>{

        if(data["success"]){
          this.native.toast_trans('send-raw-transaction');
        }else{
          alert("======publishTransaction==error======"+JSON.stringify(data));
        }

      })
  }

}
