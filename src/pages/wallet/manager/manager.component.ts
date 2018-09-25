import {Component} from '@angular/core';
import { NavController, NavParams,Events,App} from 'ionic-angular';
import {LocalStorage} from "../../../providers/Localstorage";
import {PopupProvider} from "../../../providers/popup";
import {WalletManager} from '../../../providers/WalletManager';
import {ExprotPrikeyComponent} from "../exprot-prikey/exprot-prikey.component";
import {PaypasswordResetComponent} from "../paypassword-reset/paypassword-reset.component";
import {LauncherComponent} from "../../launcher/launcher.component";
import {LanguagePage} from '../../../pages/wallet/language/language';
import {Native} from "../../../providers/Native";
import {Config} from "../../../providers/Config";
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
})
export class ManagerComponent {

  walletName = "";
  masterWalletId:string = "1";
  public currentLanguageName:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,public localStorage:LocalStorage,public popupProvider: PopupProvider, public walletManager: WalletManager,private app: App,public native:Native) {
    this.masterWalletId = Config.getCurMasterWalletId();
    this.localStorage.getWallet().then((val) => {
      if (val) {
        this.walletName = JSON.parse(val).name;
      }
    });

    this.localStorage.getLanguage("wallte-language").then((val)=>{
         this.currentLanguageName = JSON.parse(val)["name"] || "";
    });

    this.events.subscribe('language:update', (item) => {
        this.currentLanguageName = item["name"] || "";
    });
  }

  onItem(i) {
    switch (i){
      case 0:
        this.native.Go(this.navCtrl,ExprotPrikeyComponent);
        break;
      case 1:
       this.native.Go(this.navCtrl,PaypasswordResetComponent);
        break;
      case 2:
        this.popupProvider.ionicConfirm('confirmTitle', 'confirmSubTitle').then((data) => {
          if (data) {
            this.destroyWallet(this.masterWalletId);
          }
        });
        break;
      case 3:
      this.localStorage.getLanguage("wallte-language").then((val)=>{
             let item =JSON.parse(val);
             this.native.Go(this.navCtrl,LanguagePage,item);
      })

         break;
    }
  }

  destroyWallet(masterWalletId: string){
    this.localStorage.remove('coinListCache').then(()=>{
      this.localStorage.remove('ELA-Wallet').then(() => {
        this.walletManager.destroyWallet(masterWalletId, (data)=>{
          if(data["success"]){
            console.log("===destroyWallet===="+JSON.stringify(data));
            this.native.setRootRouter(LauncherComponent);
          }else{
            alert("====destroyWallet==error=="+JSON.stringify(data));
          }
        });
      });
    });
  }
}
