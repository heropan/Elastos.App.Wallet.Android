import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {ExprotPrikeyComponent} from "../exprot-prikey/exprot-prikey.component";
import {ImportComponent} from "../import/import.component";
import {WalletInfoComponent} from "../wallet-info/wallet-info.component";

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
        this.Go(WalletInfoComponent);
        break;
      case 2:
        // this.localStorage.clear();
        console.log("delete wallet");
        // this.walletManager.destroyWallet(function () {

        // });
        break;
    }

  }

}
