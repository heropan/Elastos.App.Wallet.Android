import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../app/BaseComponent';
import {WriteComponent} from "./write/write.component";
//import {WalletModel} from "../../models/wallet.model";

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html',
  // styleUrls: ['./mnemonic.component.scss']
})
export class MnemonicComponent extends BaseComponent implements OnInit {

  mnemonicList = [];
  mnemonicStr: string;

  ngOnInit() {
    this.setTitleByAssets('text-mnemonic');
    this.localStorage.getWallet().then((val)=>{
      this.walletManager.exportWalletWithMnemonic(val.backupPassword, (data) => {
      this.mnemonicStr = data.toString();
      let mnemonicArr = this.mnemonicStr.split(/[\u3000\s]+/);
      for (var i = 0; i < mnemonicArr.length; i++) {
        this.mnemonicList.push({text: mnemonicArr[i], select: true});
      }
      // console.log(this.mnemonicList);
      });
    });
  }

  onNext() {
    this.Go(WriteComponent, {mnemonicStr: this.mnemonicStr, mnemonicList: this.mnemonicList});
  }
}
