import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  // styleUrls: ['./address.component.scss']
})
export class AddressComponent extends BaseComponent implements OnInit {

  addrList = [];

  ngOnInit() {
    this.setTitleByAssets('text-contacts-address');
    this.addrList = this.walletManager.getAllAddress();
  }

  onItem() {

  }
}
