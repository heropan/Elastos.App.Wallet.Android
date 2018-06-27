import {BaseComponent} from '../../app/BaseComponent';
import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { Config } from '../../providers/Config';
import { Util } from '../../providers/Util';
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
    this.walletManager.getBalance(this.coinName, (data)=>{
      this.coinCount = data.balance/Config.SELA;
    });
    this.walletManager.getAllTransaction(this.coinName, this.start, '', (data) => {      
      let allTransaction = data['allTransaction'];
      let transactions = JSON.parse(allTransaction)['Transactions'];

      // alert("getAllTransaction" + JSON.stringify(transactions));
      for (let key in transactions) {
        let transaction = transactions[key];
        let timestamp = transaction['Timestamp'];
        let datetime = Util.dateFormat(new Date(timestamp));
        let txId = transaction['TxHash'];
        let transfer = {
          "name": this.coinName,
          "status": "complete",
          "balance": 0,
          "datetime": datetime,
          "txId": txId
        }
        this.transferList.push(transfer);
      }
    });
    // this.transferList = [{"name": "ELA", "status": "complete", "balance": 0, "datetime": 1234567890}];
  }

  onItem(item) {
    this.Go(RecordinfoComponent, {chainId: this.coinName, txId: item.txId});
  }

  onNext(type) {
    switch (type) {
      case 1:
        this.Go(ReceiveComponent, {id: this.coinId, chianId: this.coinName});
        break;
      case 2:
        this.Go(TransferComponent, {id: this.coinId, chianId: this.coinName});
        break;
      case 3:
        this.Go(RecordComponent, {id: this.coinId});
        break;
    }
  }


}
