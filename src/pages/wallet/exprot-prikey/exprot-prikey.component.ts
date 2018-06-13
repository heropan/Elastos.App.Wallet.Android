import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
//import {ValidatorsUtil} from "../../../providers/ValidatorsUtil";
import {Logger} from "../../../providers/Logger";

@Component({
  selector: 'app-exprot-prikey',
  templateUrl: './exprot-prikey.component.html',
  // styleUrls: ['./exprot-prikey.component.scss']
})
export class ExprotPrikeyComponent extends BaseComponent implements OnInit {


  wallet = {
    name: '',
    pwd: '',
    rePwd: '',
    keystore: ''
  };

  ngOnInit() {
    this.setTitleByAssets('text-wallet-export');

  }

  onWalletDatainit(){
    this.wallet.name = this.walletData.name;
  }

  onDown() {
    this.native.openFile().then(data=>{
      Logger.info(data);
    }).catch(err=>{

    });
    // if (!ValidatorsUtil.password(this.wallet.pwd)) {
    //   this.toast("text-pwd-validator");
    //   return;
    // }
    // if (this.wallet.pwd != this.wallet.rePwd) {
    //   this.toast("text-repwd-validator");
    //   return;
    // }
    //
    // this.onExport();
  }

  onExport() {
    // this.walletManager.exportWalletWithKeystore(this.wallet.keystore, this.wallet.pwd, (data) => {

    // });
  }

}
