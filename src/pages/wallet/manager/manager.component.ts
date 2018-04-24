import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.less']
})
export class ManagerComponent extends BaseComponent implements OnInit {

  list = [
    {name: '钱包名', path: ''},
    {name: '备份钱包', path: '/wallet/exprot-prikey'},
    {name: '导入钱包', path: '/wallet/import'},
    {name: '钱包详情', path: '/wallet/info'},
    {name: '退出钱包', path: ''}
  ];

  ngOnInit() {
    this.setTitleByAssets('text-wallet-manager');
  }

  onItem(item) {
    this.router.Go_v2({path: item.path});
  }

}
