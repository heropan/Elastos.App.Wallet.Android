import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {ExprotPrikeyComponent} from "../exprot-prikey/exprot-prikey.component";
import {ImportComponent} from "../import/import.component";
import {WalletInfoComponent} from "../wallet-info/wallet-info.component";
import {Config} from "../../../providers/Config";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  // styleUrls: ['./manager.component.scss']
})
export class ManagerComponent extends BaseComponent implements OnInit {

  list = Config.MANAGER_LIST;
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
        this.Go(ImportComponent);
        break;
      case 2:
        this.Go(WalletInfoComponent);
        break;
      case 3:
        // this.localStorage.clear();
        // this.walletManager.destroyWallet(function () {

        // });
        break;
    }

  }

}
