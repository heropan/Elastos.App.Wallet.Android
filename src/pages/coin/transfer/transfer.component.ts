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
    fees: '',
    payfees: 2
  };

  balance = 1.0;

  toAdd: string;

  ngOnInit() {
    this.setTitleByAssets('text-transfer');

    this.setRightIcon('./assets/images/icon/ico-scan.svg', () => {
      this.log.info('扫码');
    });
  }

  onClick(type) {
    switch (type) {
      case 1:
        this.router.Go_v2({path: 'contacts/list'});
        break;
      case 2:   // 转账

        break;
    }

  }

}
