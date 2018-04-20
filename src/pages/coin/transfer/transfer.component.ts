import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.less']
})
export class TransferComponent extends BaseComponent implements OnInit {


  transfer: any = {
    toAdd: '',
    amount: '',
    remark: '',
    fees: ''
  };

  toAdd: string;

  ngOnInit() {
    this.setTitleByAssets('text-transfer');
  }

  onTransfer() {
    // 转账
  }

}
