import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
})
export class AddressComponent extends BaseComponent implements OnInit {
  masterWalletId:string ="1";
  addrList = [];
  chinaId: string;
  ngOnInit() {
    this.setTitleByAssets('text-contacts-address');
    this.chinaId = this.getNavParams().get("chinaId");
    this.walletManager.getAllAddress(this.masterWalletId,this.chinaId, 0, (data) => {
      this.addrList = JSON.parse(data)['Addresses'];
    });
  }

  onItem(item) {
    this.native.copyClipboard(item);
    this.toast('copy-ok');
  }
}
