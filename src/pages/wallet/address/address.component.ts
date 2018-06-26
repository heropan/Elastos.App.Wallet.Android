import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  // styleUrls: ['./address.component.scss']
})
export class AddressComponent extends BaseComponent implements OnInit {

  addrList = [];
  chianId: string;

  ngOnInit() {
    this.setTitleByAssets('text-contacts-address');
    this.chianId = this.getNavParams().get("chianId");
    this.walletManager.getAllAddress(this.chianId, 0, (data) => {
      this.addrList = data['Addresses'];
    });
  }

  onItem(item) {
    this.native.copyClipboard(item);
  }
}
