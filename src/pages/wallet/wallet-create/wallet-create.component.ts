import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {ValidatorsUtil} from "../../../providers/ValidatorsUtil";
import {DialogConfig} from "ngx-weui";
import {Logger} from "../../../providers/Logger";
//import {WalletManager} from "../../../providers/WalletManager";
import {MnemonicComponent} from "../../mnemonic/mnemonic.component";

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  // styleUrls: ['./wallet-create.component.scss']
})
export class WalletCreateComponent extends BaseComponent implements OnInit {
 // @ViewChild('auto') autoAS: DialogComponent;
 // @ViewChild('mask') mask: MaskComponent;


  DEFCONFIG: DialogConfig = <DialogConfig>{
    title: this.getLanguageInstance()["text-pay-password"],
    content: '',
    skin: 'auto',
    type: 'prompt',
    cancel:  this.getLanguageInstance()["cancel"],
    confirm: this.getLanguageInstance()["confirm"] ,
    input: 'password',
  };

  payPasswordType = 0;

  wallet = {
    name: '',
    pwd: '',
    rePwd: '',
    singleAddress: false,
    payPassword:'' ,
    rePayPassword:''
  };


  ngOnInit() {
    this.setTitleByAssets('launcher-create-wallet');
  }

  onCreate() {
    if (ValidatorsUtil.isNull(this.wallet.name)) {
      this.toast("text-wallet-name-validator");
      return;
    }
    if (!ValidatorsUtil.password(this.wallet.pwd)) {
      this.toast("text-pwd-validator");
      return;
    }
    if (this.wallet.pwd != this.wallet.rePwd) {
      this.toast("text-wallet-repwd");
      return;
    }
    this.onShowPassword();
  }

  onShowPassword() {
    this.dialogService.show(this.DEFCONFIG).subscribe((res)=>{this.onPayPassword(res,this)});
  }

  onPayPassword(res:any,tath:any){
      Logger.info(res.result);
      if(res.type == 'primary'){
        if(this.payPasswordType == 1){   //再次输入
          this.wallet.rePayPassword = res.result;
          if (this.wallet.payPassword != this.wallet.rePayPassword) {
            this.toast("text-wallet-repwd");
            this.dialogService.show(this.DEFCONFIG).subscribe((res)=>{this.onPayPassword(res,tath)});
          }else{
            this.payPasswordType = 0;
            this.createWallet();
          }
        }else{
          if(!ValidatorsUtil.password(res.result)){
            this.toast("text-pwd-validator");
            this.dialogService.show(this.DEFCONFIG).subscribe((res)=>{this.onPayPassword(res,tath)});
          }else{
            this.wallet.payPassword = res.result;
            this.payPasswordType = 1;
            this.DEFCONFIG.title = this.getLanguageInstance()["text-pay-repassword"];
            this.dialogService.show(this.DEFCONFIG).subscribe((res)=>{this.onPayPassword(res,tath)});
          }
        }
      }
  }

  createWallet(){
    this.toastService.loading(this.getLanguageInstance()["text-wait"],0);
    this.toast('text-wallet-create-ok');  
    // Master Wallet
    alert("-----------createWallet: func-----")
    this.walletManager.createMasterWallet(this.wallet.pwd, this.payPasswordType, (val) => {
      alert("-----------createWallet-----")
      this.createSubWallet();
    });
  }

  createSubWallet(){
    // Sub Wallet
    alert("-----------createSubWallet: func-----")
    this.walletManager.createSubWallet(0, "Ela", 0, this.wallet.payPassword, false, 0, (val)=>{
      alert("-----------createSubWallet: -----")
      this.walletManager.getPubKey((data) => {
        alert("-----------getPubKey: -----")
        this.localStorage.setWallet({
          'name': this.wallet.name,
          'payPassword': this.wallet.payPassword,
          'backupPassword': this.wallet.pwd,
          'pubKey': data.pubKey});
        this.Go(MnemonicComponent);
      });
    });
  }


}
