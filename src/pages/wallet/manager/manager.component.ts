import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {ExprotPrikeyComponent} from "../exprot-prikey/exprot-prikey.component";
import {ImportComponent} from "../import/import.component";
// import {WalletInfoComponent} from "../wallet-info/wallet-info.component";
import {PaypasswordResetComponent} from "../paypassword-reset/paypassword-reset.component";
import {PopupProvider} from "../../../providers/popup";
import {LauncherComponent} from "../../launcher/launcher.component";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  // styleUrls: ['./manager.component.scss']
})
export class ManagerComponent extends BaseComponent implements OnInit {

  walletName = ""

  ngOnInit() {
    this.setTitleByAssets('text-wallet-manager');
    // wallet name
    this.localStorage.getWallet().then((val) => {
      if (val) {
        this.walletName = JSON.parse(val).name;
      }
    });
  }

  onItem(item, i) {
    // console.log(i)
    switch (i){
      case 0:
        this.Go(ExprotPrikeyComponent);
        break;
      case 1:
        this.Go(PaypasswordResetComponent);
        break;
      case 2:
        this.popupProvider.ionicConfirm('confirmTitle', 'confirmSubTitle').then(() => {
               alert("2222222222");
               this.destroyWallet("1");
        });
        break;
    }

  }

  destroyWallet(masterWalletId:string){
    this.localStorage.remove('myWallet').then(() => {
      this.Go(LauncherComponent);
    });
    this.walletManager.destroyWallet(masterWalletId,(result)=>{

    });
  }

}
