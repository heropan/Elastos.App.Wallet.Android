import { Component, OnInit } from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';

@Component({
  selector: 'app-recordinfo',
  templateUrl: './recordinfo.component.html',
  // styleUrls: ['./recordinfo.component.scss']
})
export class RecordinfoComponent extends BaseComponent implements OnInit {


  ngOnInit() {
    this.setTitleByAssets('text-record');
    let txId = this.getNavParams().get("txId");
    // this.walletManager.getAllTransaction(this.start,this.count, txId, (data)=>{
    //   this.transactionRecord = data
    // });
  }

}
