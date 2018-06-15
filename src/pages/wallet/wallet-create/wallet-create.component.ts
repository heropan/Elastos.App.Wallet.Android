import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {Util} from "../../../providers/Util";
import {MnemonicComponent} from "../../mnemonic/mnemonic.component";

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
})
export class WalletCreateComponent extends BaseComponent implements OnInit {

  payPasswordType = 0;
  wallet = {
    name: '',
    singleAddress: false,
    payPassword:'' ,
    rePayPassword:''
  };

  ngOnInit() {
    this.setTitleByAssets('launcher-create-wallet');
  }

  onCreate() {
    if (Util.isNull(this.wallet.name)) {
      this.toast("text-wallet-name-validator");
      return;
    }
    if (!Util.password(this.wallet.payPassword)) {
      this.toast("text-pwd-validator");
      return;
    }
    if (this.wallet.payPassword != this.wallet.rePayPassword) {
      this.toast("text-wallet-repwd");
      return;
    }
    this.createWallet();
  }

  createWallet(){
    // Master Wallet
    this.walletManager.createMasterWallet("1", this.getMnemonicLang(), (val) => {
      this.Go(MnemonicComponent, {payPassword: this.wallet.payPassword});
    });
  }
}
