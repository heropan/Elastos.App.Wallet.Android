import {Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import {Util} from "../../../providers/Util";
import {MnemonicComponent} from "../../mnemonic/mnemonic.component";
import {Native} from "../../../providers/Native";
@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
})
export class WalletCreateComponent {
 constructor(public navCtrl: NavController,public native:Native){

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
    this.native.Go(this.navCtrl,MnemonicComponent, {payPassword: this.wallet.payPassword, name: this.wallet.name, singleAddress: this.wallet.singleAddress});
  }
}
