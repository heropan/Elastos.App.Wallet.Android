import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../app/BaseComponent';
import {WriteComponent} from "./write/write.component";
import {Util} from "../../providers/Util";

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html'
})
export class MnemonicComponent extends BaseComponent implements OnInit {
  masterWalletId:string = "1";
  mnemonicList = [];
  mnemonicStr: string;
  mnemonicPassword: string="";
  mnemonicRepassword: string;
  payPassword: string;
  name: string;
  singleAddress: boolean = false;
  defaultCointype = "Ela";
  isSelect:boolean = false;

  ngOnInit() {
    this.setTitleByAssets('text-mnemonic');
    this.walletManager.generateMnemonic(this.getMnemonicLang(),(data) => {
      //let data ={"mnemonic":"aaa bbb ccc ddd eee  fff ggg  ssss kkk lll zzz hhh"};
      if(data["success"]){
        console.log("====generateMnemonic===="+JSON.stringify(data));
        this.mnemonicStr = data["success"].toString();
        let mnemonicArr = this.mnemonicStr.split(/[\u3000\s]+/);
        for (var i = 0; i < mnemonicArr.length; i++) {
          this.mnemonicList.push({text: mnemonicArr[i], selected: false});
        }
      }else{
             alert("generateMnemonic=error:"+JSON.stringify(data));
      }
    });
    this.payPassword = this.getNavParams().get("payPassword");
    this.name = this.getNavParams().get("name");
    this.singleAddress = this.getNavParams().get("singleAddress");
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
    this.walletManager.createMasterWallet(this.masterWalletId, this.mnemonicStr, this.mnemonicPassword, this.payPassword,this.getMnemonicLang(),(data) =>{
           if(data["success"]){
            console.log("====createMasterWallet===="+JSON.stringify(data));
            this.createSubWallet('ELA');
           }else{
             alert("createMasterWallet=error:"+JSON.stringify(data));
           }

    })
  }

  createSubWallet(chainId){
    // Sub Wallet
    this.walletManager.createSubWallet(this.masterWalletId,chainId, this.payPassword, this.singleAddress, 0, (data)=>{
          if(data["success"]){
               console.log("====createSubWallet===="+JSON.stringify(data));
               this.Go(WriteComponent, {mnemonicStr: this.mnemonicStr, mnemonicList: this.mnemonicList});
               this.localStorage.setWallet({
                'name': this.name
               });
          }else{
                alert("createSubWallet=error:"+JSON.stringify(data));
          }
    });
  }
}
