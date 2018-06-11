import { Component, OnInit } from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';

@Component({
  selector: 'app-recordinfo',
  templateUrl: './recordinfo.component.html',
  // styleUrls: ['./recordinfo.component.scss']
})
export class RecordinfoComponent extends BaseComponent implements OnInit {

  transactionRecord: any = {
    txId: 'txId',
    sendInfo: 'sendInfo',
    recordInfo: 'recordInfo',
    transactionTime: '',
    payfees: 1,
    confirmCount: 1,
    remark: 'remark',
  };

  balance = 1.0;


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
