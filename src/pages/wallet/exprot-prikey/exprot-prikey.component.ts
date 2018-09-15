import {Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {WalletManager} from '../../../providers/WalletManager';
import {Native} from "../../../providers/Native";
import {Util} from "../../../providers/Util";
import {LocalStorage} from "../../../providers/Localstorage";


@Component({
  selector: 'app-exprot-prikey',
  templateUrl: './exprot-prikey.component.html'
})
export class ExprotPrikeyComponent  {

  constructor(public navCtrl: NavController,public navParams: NavParams, public walletManager: WalletManager,public native: Native,public localStorage:LocalStorage) {
           this.onWalletDatainit();
  }

  public backupWalletPlainText:any;
  exprotObj = {
    name: '',
    backupPassWord: '',
    reBackupPassWord: '',
    payPassword: ''
  };

  onWalletDatainit(){
    this.localStorage.getWallet().then((val)=>{
      if(val === null){
        this.exprotObj.name = "";
        return;
      }
      this.exprotObj.name = JSON.parse(val)["name"];
    });
  }

  checkparms(){

    if(Util.isNull(this.exprotObj.backupPassWord)){
       this.native.toast_trans("text-wallet-pwd");
       return false;
    }

    if(this.exprotObj.backupPassWord != this.exprotObj.reBackupPassWord){
      this.native.toast_trans("text-passworld-compare");
       return false;
    }

    if(Util.isNull(this.exprotObj.payPassword)){
      this.native.toast_trans("text-pay-passworld-input");
      return false;
    }

     return true;
  }

  onDown() {
     if(this.checkparms()){
         this.onExport();
     }
  }

  onExport() {
    this.walletManager.exportWalletWithKeystore(this.exprotObj.backupPassWord,this.exprotObj.payPassword,(reslut) => {
                 this.backupWalletPlainText = reslut.keystoreContent;
    });
  }

  onCopay(){
    this.native.copyClipboard(this.backupWalletPlainText).then(()=>{
      this.native.toast_trans('text-copied-to-clipboard');
    }).catch(()=>{

    });
  }

}
