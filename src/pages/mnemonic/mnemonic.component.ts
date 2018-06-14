import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../app/BaseComponent';
import {WriteComponent} from "./write/write.component";
//import {WalletModel} from "../../models/wallet.model";
import {ValidatorsUtil} from "../../providers/ValidatorsUtil";

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html',
  // styleUrls: ['./mnemonic.component.scss']
})
export class MnemonicComponent extends BaseComponent implements OnInit {

  mnemonicList = [];
  mnemonicStr: string;
  mnemonicPassword: string;
  mnemonicRepassword: string;
  payPassword: string;

  ngOnInit() {
    this.walletManager.generateMnemonic((data) => {
      alert("exportWalletWithMnemonic: " + data);
      this.mnemonicStr = data.mnemonic.toString();
      let mnemonicArr = this.mnemonicStr.split(/[\u3000\s]+/);
      for (var i = 0; i < mnemonicArr.length; i++) {
        this.mnemonicList.push({text: mnemonicArr[i], select: true});
      }
      // console.log(this.mnemonicList);
    });
    this.payPassword = this.getNavParams().get("payPassword");
  }

  onNext() {
    this.setTitleByAssets('text-mnemonic');
    if (!ValidatorsUtil.password(this.mnemonicPassword)) {
      this.toast("text-pwd-validator");
      return;
    }
    if (this.mnemonicPassword != this.mnemonicRepassword) {
      this.toast("text-repwd-validator");
      return;
    }
    this.walletManager.initializeMasterWallet("1", this.mnemonicStr, this.mnemonicPassword, this.payPassword, (data) => {
    
    })
    this.Go(WriteComponent, {mnemonicStr: this.mnemonicStr, mnemonicList: this.mnemonicList});
  }
}
