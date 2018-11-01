import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Native} from "../../providers/Native";
import {WalletManager} from '../../providers/WalletManager';
import {Config} from '../../providers/Config';
import {AddpublickeyPage} from '../../pages/addpublickey/addpublickey';
@Component({
  selector: 'page-mpublickey',
  templateUrl: 'mpublickey.html',
})
export class MpublickeyPage {

  public masterWalletId:string ="1";
  public qrcode: string=null;
  exatParm:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public native: Native,public walletManager: WalletManager) {
        this.exatParm = this.navParams.data;
        console.log("==========this.exatParm============="+JSON.stringify(this.exatParm));
        this.getPublicKey();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MpublickeyPage');
  }

  copy(){
    this.native.copyClipboard(this.qrcode);
    this.native.toast_trans('copy-ok');
  }

  getPublicKey(){
    this.masterWalletId = Config.getCurMasterWalletId();
    console.log("======================"+this.exatParm["mnemonicStr"]);
    console.log("======================"+this.exatParm["mnemonicPassword"]);
    this.walletManager.getMultiSignPubKeyWithMnemonic(this.exatParm["mnemonicStr"],this.exatParm["mnemonicPassword"],(data)=>{
      console.log("======================="+data);
      if(data["success"]){
        this.qrcode = data["success"];
        console.log("==========getPublicKey==============="+JSON.stringify(data));
       }else{
         alert("==========getPublicKey======error========="+JSON.stringify(data));
       }
    });
  }

  nextPage(){
    this.native.Go(this.navCtrl,AddpublickeyPage,this.exatParm);
  }

}
