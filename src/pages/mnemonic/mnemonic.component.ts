import {Component} from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import {Native} from "../../providers/Native";
import {WalletManager} from '../../providers/WalletManager';
import {Config} from '../../providers/Config';
import {WriteComponent} from "./write/write.component";
import {Util} from "../../providers/Util";
import {LocalStorage} from "../../providers/Localstorage";
import {AddpublickeyPage} from '../../pages/addpublickey/addpublickey';

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html'
})
export class MnemonicComponent {
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
  multType:any;
  constructor(public navCtrl: NavController,public navParams: NavParams, public walletManager: WalletManager,public native: Native,public localStorage:LocalStorage){
          this.init();
  }
  init() {
    this.masterWalletId = Config.uuid(6,16);
    this.walletManager.generateMnemonic(this.native.getMnemonicLang(),(data) => {

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
    this.payPassword = this.navParams.get("payPassword");
    this.name = this.navParams.get("name");
    this.singleAddress = this.navParams.get("singleAddress");
    this.multType = this.navParams.get("mult");
    console.log("====this.multType====="+this.navParams.get("mult"));
  }

  onNext() {
    if (!Util.password(this.mnemonicPassword) && this.isSelect) {
      this.native.toast_trans("text-pwd-validator");
      return;
    }

    if (this.mnemonicPassword != this.mnemonicRepassword && this.isSelect) {
      this.native.toast_trans("text-repwd-validator");
      return;
    }

    if(!Util.isEmptyObject(this.multType)){
        this.native.Go(this.navCtrl,AddpublickeyPage,{"totalCopayers":this.multType["totalCopayers"],"requiredCopayers":this.multType["requiredCopayers"],"mnemonicStr":this.mnemonicStr,"mnemonicPassword":this.mnemonicPassword,"payPassword":this.payPassword})
        return;
    }
    this.walletManager.createMasterWallet(this.masterWalletId, this.mnemonicStr, this.mnemonicPassword, this.payPassword,this.native.getMnemonicLang(),(data) =>{
           if(data["success"]){
            console.log("====createMasterWallet===="+JSON.stringify(data));
            this.createSubWallet('ELA');
           }else{
             alert("createMasterWallet=error:"+JSON.stringify(data));
           }
    });
  }

  createSubWallet(chainId){
    // Sub Wallet
    this.walletManager.createSubWallet(this.masterWalletId,chainId, this.payPassword, this.singleAddress, 0, (data)=>{
          if(data["success"]){
              //  console.log("====createSubWallet===="+JSON.stringify(data));
              //  Config.setCurMasterWalletId(this.masterWalletId);
              //  this.native.Go(this.navCtrl,WriteComponent, {mnemonicStr: this.mnemonicStr, mnemonicList: this.mnemonicList});
              //  this.localStorage.setWallet({
              //   'name': this.name
              //  });
              this.saveWalletList();
          }else{
                alert("createSubWallet=error:"+JSON.stringify(data));
          }
    });
  }

  saveWalletList(){
    Config.getMasterWalletIdList().push(this.masterWalletId);
    this.localStorage.setWalletList(Config.getMasterWalletIdList()).then((data)=>{
            this.localStorage.saveCurMasterId({masterId:this.masterWalletId}).then((data)=>{
              Config.setCurMasterWalletId(this.masterWalletId);
              this.native.Go(this.navCtrl,WriteComponent, {mnemonicStr: this.mnemonicStr, mnemonicList: this.mnemonicList});
            });
    })
  }
}
