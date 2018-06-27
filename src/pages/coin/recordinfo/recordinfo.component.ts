import { Component, OnInit } from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {Config} from '../../../providers/Config';

@Component({
  selector: 'app-recordinfo',
  templateUrl: './recordinfo.component.html',
  // styleUrls: ['./recordinfo.component.scss']
})
export class RecordinfoComponent extends BaseComponent implements OnInit {

  transactionRecord: any = {
    txId: '1c4c4af6a164bf6eb5c17e56d79b0a744865538a7a75d1d61a463728b217cb49',
    receiveAddress: 'receiveAddress',
    transactionTime: '',
    payfees: 1,
    confirmCount: 1,
    remark: 'remark',
  };

  chinaId: string;
  start = 0;

  blockchain_url = Config.BLOCKCHAIN_URL;

  ngOnInit() {
    this.setTitleByAssets('text-record');
    let txId = this.getNavParams().get("txId");
    let chinaId = this.getNavParams().get("id");
    alert(txId)
    alert(chinaId)
    // this.walletManager.getAllTransaction(this.chinaId, this.start, txId, (data) => {      
    //   let allTransaction = data['allTransaction'];
    //   let transactions = JSON.parse(allTransaction)['Transactions'];
    //   // alert("getAllTransaction" + JSON.stringify(transactions));
    //   for (let key in transactions) {
    //     let transaction = transactions[key];
    //     let timestamp = transaction['Timestamp'];
    //     let datetime = Util.dateFormat(new Date(timestamp));
    //     let transfer = {
    //       "name": this.coinName,
    //       "status": "complete",
    //       "balance": 0,
    //       "datetime": datetime
    //     }
    //     this.transferList.push(transfer);
    //   }
    // });
  }  

}
