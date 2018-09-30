import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PopupProvider} from "../../providers/popup";
import {Util} from "../../providers/Util";
import {Native} from "../../providers/Native";
import {ScancodePage} from '../../pages/scancode/scancode';
import {WalletManager} from '../../providers/WalletManager'
import { Config } from '../../providers/Config';
@Component({
  selector: 'page-txdetails',
  templateUrl: 'txdetails.html',
})
export class TxdetailsPage {
  public txDetails:any;
  public type:any;
  public masterWalletId:string="1";
  public raw:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public popupProvider:PopupProvider,public native:Native,public walletManager:WalletManager) {
    this.type = this.navParams.data["type"];
    this.txDetails = JSON.parse(this.navParams.data['content'])['tx'];
    this.masterWalletId = Config.getCurMasterWalletId();
    console.log("========this.txDetails=========="+JSON.stringify(this.txDetails));
    this.walletManager.decodeTransactionFromString(this.txDetails["raw"],(raw)=>{
                   if(raw["success"]){
                       console.log("======convertFromHexString======"+JSON.stringify(raw));
                       this.raw = raw["success"];
                       console.log("=====raw======"+typeof(this.raw));
                       this.txDetails["address"] =JSON.parse(raw["success"])["Outputs"][0]["Address"];
                       this.txDetails["amount"] = JSON.parse(raw["success"])["Outputs"][0]["Amount"]/Config.SELA;

                   }else{
                        alert("======convertFromHexString==error===="+JSON.stringify(raw));
                   }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TxdetailsPage');
  }

  nextPage(){
     if(this.type === 4){
        this.getPassWord();
     }else if(this.type === 3){
        this.sendTx(this.masterWalletId,this.txDetails["chianId"],this.raw);
     }
  }

  getPassWord(){
    this.popupProvider.presentPrompt().then((data)=>{
     if(Util.isNull(data)){
       this.native.toast_trans("text-id-kyc-prompt-password");
       return;
     }

     this.singTx(this.masterWalletId,this.txDetails["chianId"],this.raw,data.toString());

    }).catch(err=>{
      alert(JSON.stringify(err));
    })
  }

  singTx(masterWalletId:string,chain:string,rawTransaction:string,payPassWord:string){
    this.walletManager.signTransaction(masterWalletId,chain,rawTransaction,payPassWord,(data)=>{
              if(data["success"]){
                console.log("========signTransaction========="+JSON.stringify(data));
                this.walletManager.encodeTransactionToString(data["success"],(raw)=>{
                             if(raw["success"]){
                              this.native.Go(this.navCtrl,ScancodePage,{"tx":{"chianId":this.txDetails["chianId"],"fee":this.txDetails["fee"], "raw": raw["success"]}});
                               }
                });
              }else{
                 alert("======signTransaction===error==="+JSON.stringify(data));
              }
    })
  }


  sendTx(masterWalletId:string,chain:string,rawTransaction:string){
      this.walletManager.publishTransaction(masterWalletId,chain,rawTransaction,(data)=>{

        if(data["success"]){
          console.log("========publishTransaction========="+JSON.stringify(data));
          this.native.toast_trans('send-raw-transaction');
        }else{
          alert("======publishTransaction==error======"+JSON.stringify(data));
        }

      })
  }

}
