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

  list = [
    {name: '钱包名'},
    {name: '备份钱包'},
    {name: '导入钱包'},
    {name: '钱包详情'},
    {name: '退出钱包'}
  ];

  ngOnInit() {
    this.setTitleByAssets('text-wallet-manager');
  }

  onItem(item,i) {
    switch (i){
      case 0:

        break;
      case 1:
        this.Go(ExprotPrikeyComponent);
        break;
      case 2:
        this.Go(ImportComponent);
        break;
      case 3:
        this.Go(WalletInfoComponent);
        break;
      case 4:
        // this.storage.clear();
        this.walletManager.destroyWallet(function () {

        });
        break;
    }

  }

}
