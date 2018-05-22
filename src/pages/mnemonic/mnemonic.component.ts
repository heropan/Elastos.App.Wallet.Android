import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../app/BaseComponent';
import {WriteComponent} from "./write/write.component";
import {WalletModel} from "../../models/wallet.model";

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html',
  // styleUrls: ['./mnemonic.component.scss']
})
export class MnemonicComponent extends BaseComponent implements OnInit {


  mnemonicList = [
    {text: '醉', select: true},
    {text: '酒', select: true},
    {text: '当', select: true},
    {text: '歌', select: true},
    {text: '人', select: true},
    {text: '生', select: true},
    {text: '几', select: true},
    {text: '和', select: true},
    {text: '哎', select: true},
    {text: '呦', select: true},
    {text: '呦', select: true},
    {text: '呦', select: true},
  ];

  ngOnInit() {
    this.setTitleByAssets('text-mnemonic');
    //this.storage.getWallet((data: WalletModel) => {

      // this.walletManager.exportWalletWithMnemonic(this.walletData.backupPassword, (res) => {
      //   this.walletData.mnemonic = res.mnemonic;
      //
      // });

   // });
  }

  onNext() {
    this.Go(WriteComponent);
  }
}
