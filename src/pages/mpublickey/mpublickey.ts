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
        if(this.exatParm["mnemonicStr"]){
          this.getPublicKey();
        }else{
          this.getMultiSignPubKeyWithPrivKey();
        }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MpublickeyPage');
  }

  copy(){
    this.native.copyClipboard(this.qrcode);
    this.native.toast_trans('copy-ok');
  }

  getPublicKey(){

    this.walletManager.getMultiSignPubKeyWithMnemonic(this.exatParm["mnemonicStr"],this.exatParm["mnemonicPassword"],(data)=>{

      if(data["success"]){
        this.qrcode = data["success"];
       }else{
       }
    });
  }

  getMultiSignPubKeyWithPrivKey(){
    console.log("====getMultiSignPubKeyWithPrivKey====");
    this.walletManager.getMultiSignPubKeyWithPrivKey(this.exatParm["importText"],(data)=>{
      if(data["success"]){
        this.qrcode = data["success"];
       }else{
       }
    });
  }

  nextPage(){
    this.native.Go(this.navCtrl,AddpublickeyPage,this.exatParm);
  }

}
