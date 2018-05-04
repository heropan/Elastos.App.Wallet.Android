import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  // styleUrls: ['./wallet-create.component.scss']
})
export class WalletCreateComponent extends BaseComponent implements OnInit {


  wallet = {
    name: '',
    pwd: '',
    rePwd: ''
  };


  ngOnInit() {
    this.setTitleByAssets('launcher-create-wallet');
  }

  onCreate() {

  }

}
