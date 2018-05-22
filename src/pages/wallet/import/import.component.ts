import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {ValidatorsUtil} from "../../../providers/ValidatorsUtil";
import {Logger} from "../../../providers/Logger";

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  // styleUrls: ['./import.component.scss']
})
export class ImportComponent extends BaseComponent implements OnInit {

  wallet = {
    keystore: '',
    mnemonic: '',
    pwd: '',
    payPwd: '',
    rePayPwd: '',
    type: 1
  };

  ngOnInit() {
    this.setTitleByAssets('launcher-backup-import');
  }


  onImport() {
    if (this.wallet.type == 1) {   // 私钥
      if (ValidatorsUtil.isNull(this.wallet.keystore)) {
        this.toast('text-select-key');
        return;
      }
    } else {
      if (ValidatorsUtil.isNull(this.wallet.mnemonic)) {
        this.toast('text-input-mnemonic');
        return;
      }
    }

    if (!ValidatorsUtil.password(this.wallet.pwd)) {
      this.toast("text-pwd-validator");
      return;
    }
    if (this.wallet.pwd != this.wallet.rePayPwd) {
      this.toast("text-wallet-repwd");
      return;
    }

    this.importWallet();
  }


  onChange() {
    this.wallet.type = (this.wallet.type === 1 ? 2 : 1);
    console.log(this.wallet.type);
  }

  selectFile() {
    this.wallet.keystore = 'xxx.jpg';
      // this.native.openFile().then(data => {
      //   this.wallet.keystore = data;
      //   Logger.info(data);
      // }).catch(err => {
      //  this.toast('text-select-file-error');
      //   Logger.info(err);
      // });
  }

  importWallet(){
    if(this.wallet.type == 1){
      this.walletManager.importWalletWithKeystore(this.wallet.keystore,this.wallet.pwd,this.wallet.payPwd,(data)=>{

      });
    }else{
      this.walletManager.importWalletWithMnemonic(this.wallet.mnemonic,this.wallet.pwd,this.wallet.payPwd,(data)=>{

      });
    }

  }

}
