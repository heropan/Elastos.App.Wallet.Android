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

  ngOnInit() {
    this.setTitleByAssets('text-mnemonic');
    this.localStorage.getWallet().then((val)=>{
      this.walletManager.exportWalletWithMnemonic(val.backupPassword, (res) => {
        this.mnemonicList = res.mnemonic;
      });
    });
  }

  onNext() {
    this.Go(WriteComponent);
  }
}
