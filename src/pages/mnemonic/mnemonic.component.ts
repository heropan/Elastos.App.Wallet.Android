import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../app/BaseComponent';
import {WriteComponent} from "./write/write.component";
//import {WalletModel} from "../../models/wallet.model";
import {Util} from "../../providers/Util";

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html'
})
export class MnemonicComponent extends BaseComponent implements OnInit {

  mnemonicList = [];
  mnemonicStr: string;
  mnemonicPassword: string="";
  mnemonicRepassword: string;
  payPassword: string;
  defaultCointype = "Ela";
  isSelect:boolean = false;
  ngOnInit() {
    this.setTitleByAssets('text-mnemonic');
    this.walletManager.generateMnemonic((data) => {
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

    if (!Util.password(this.mnemonicPassword) && this.isSelect) {
      this.toast("text-pwd-validator");
      return;
    }

    if (this.mnemonicPassword != this.mnemonicRepassword && this.isSelect) {
      this.toast("text-repwd-validator");
      return;
    }
    this.walletManager.initializeMasterWallet("1", this.mnemonicStr, this.mnemonicPassword, this.payPassword, (data) =>{
           this.getSupportedChains();
           this.Go(WriteComponent, {mnemonicStr: this.mnemonicStr, mnemonicList: this.mnemonicList});
           this.localStorage.setWallet({
            'name': "sss"
           });
    })
  }

  getSupportedChains(){
    this.walletManager.getSupportedChains((result)=>{
      for(let key of result){
         alert("已经支持的所有子钱包=="+key);
         this.createSubWallet(key);
      }
     });
   }

  createSubWallet(chainId){
    // Sub Wallet
    this.walletManager.createSubWallet(chainId,this.payPassword, false, 0, (val)=>{

    });
  }
}
