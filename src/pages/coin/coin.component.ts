import {BaseComponent} from '../../app/BaseComponent';
import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { Config } from '../../providers/Config';
import {RecordComponent} from "./record/record.component";
import {TransferComponent} from "./transfer/transfer.component";
import {ReceiveComponent} from "./receive/receive.component";
import {RecordinfoComponent} from "./recordinfo/recordinfo.component";


@Component({
  selector: 'coin',
  templateUrl: './coin.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CoinComponent extends BaseComponent implements OnInit {


  transferList = [];

  coinCount = 0;

  coinId = 0;

  coinName = "";

  start = 0;

  count = Config.LIST_COUNT;


  ngOnInit() {
    this.coinName = this.getNavParams().get("name");
    this.setTitle(this.coinName);
    this.initData();
  }

  initData(){
    this.walletManager.getBalance(this.coinName,(data)=>{
      this.coinCount = data.balance;
    });
    this.transferList = [{"name": "ELA", "status": "complete", "balance": 0, "datetime": 1234567890}];
    // this.walletManager.getAllTransaction(this.start,this.count,'',(data)=>{
    //
    // });
  }

  onItem(item) {
    this.Go(RecordinfoComponent,{id: this.coinId, txId: item.txId});
  }

  onNext(type) {
    switch (type) {
      case 1:
        this.Go(ReceiveComponent, {id: this.coinId, chianId:this.coinName});
        break;
      case 2:
        this.Go(TransferComponent, {id: this.coinId, chianId:this.coinName});
        break;
      case 3:
        this.Go(RecordComponent, {id: this.coinId});
        break;
    }
  }


}
