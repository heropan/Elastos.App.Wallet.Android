import {Component} from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import {Util} from "../../../providers/Util";
import {MnemonicComponent} from "../../mnemonic/mnemonic.component";
import {Native} from "../../../providers/Native";
@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
})
export class WalletCreateComponent {
 MultObj:any;
 constructor(public navCtrl: NavController,public navParams:NavParams,public native:Native){
      this.MultObj = this.navParams.data;
      console.log("====WalletCreateComponent====="+JSON.stringify(this.MultObj));
 }
  wallet = {
    name: '',
    singleAddress: false,
    payPassword:'' ,//houpeitest
    rePayPassword:''//houpeitest
  };


  onCreate() {
    if (Util.isNull(this.wallet.name)) {
      this.native.toast_trans("text-wallet-name-validator");
      return;
    }

    if(Util.isWalletName(this.wallet.name)){
       this.native.toast_trans("text-wallet-name-validator1");
       return;
    }
    if (!Util.password(this.wallet.payPassword)) {
      this.native.toast_trans("text-pwd-validator");
      return;
    }
    if (this.wallet.payPassword != this.wallet.rePayPassword) {
      this.native.toast_trans("text-repwd-validator");
      return;
    }
    this.createWallet();
  }

  createWallet(){
    // Master Wallet
    console.log("===========singleAddress0:"+this.wallet.singleAddress);
    this.native.Go(this.navCtrl,MnemonicComponent, {payPassword: this.wallet.payPassword, name: this.wallet.name, singleAddress: this.wallet.singleAddress,mult:this.MultObj});
  }
}
