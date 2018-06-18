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
    sendInfo: 'sendInfo',
    recordInfo: 'recordInfo',
    transactionTime: '',
    payfees: 1,
    confirmCount: 1,
    remark: 'remark',
  };

  balance = 1.0;

  blockchain_url = Config.BLOCKCHAIN_URL;

  ngOnInit() {
    this.setTitleByAssets('text-record');
    // let txId = this.getNavParams().get("txId");
    // this.walletManager.getAllTransaction(this.start,this.count, txId, (data)=>{
    //   this.transactionRecord = data
    // });
    // this.walletManager.getBalanceFun((data)=>{
    //   this.balance = data.balance;
    // });
  }  

}
