import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.less']
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



  onTest(obj) {
    this.log.info(obj.text);
    this.log.info(obj.a);
  }

  onImport() {

  }

}
