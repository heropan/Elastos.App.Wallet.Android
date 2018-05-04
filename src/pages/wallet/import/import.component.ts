import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  // styleUrls: ['./import.component.scss']
})
export class ImportComponent extends BaseComponent implements OnInit {

  wallet = {
    keystore: '',
    mnemonic: '',
    pwd: '',
    rePwd: '',
    type: 1
  };

  ngOnInit() {
    this.setTitleByAssets('launcher-backup-import');
  }


  onImport() {

  }

  onChange() {
    this.wallet.type = (this.wallet.type === 1 ? 2 : 1);
    console.log(this.wallet.type);
  }

}
