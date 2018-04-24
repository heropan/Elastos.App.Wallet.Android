import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';

@Component({
  selector: 'app-exprot-prikey',
  templateUrl: './exprot-prikey.component.html',
  styleUrls: ['./exprot-prikey.component.less']
})
export class ExprotPrikeyComponent extends BaseComponent implements OnInit {


  wallet = {
    name: '我的大钱包',
    pwd: '',
    rePwd: ''
  };

  ngOnInit() {
    this.setTitleByAssets('text-wallet-export');
  }

  onDown(){

  }

}
