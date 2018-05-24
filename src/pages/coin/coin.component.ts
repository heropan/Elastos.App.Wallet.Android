import {BaseComponent} from '../../app/BaseComponent';
import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { Config } from '../../providers/Config';
import {IonicPage} from "ionic-angular";
import {RecordComponent} from "./record/record.component";
import {TransferComponent} from "./transfer/transfer.component";
import {ReceiveComponent} from "./receive/receive.component";
import {RecordinfoComponent} from "./recordinfo/recordinfo.component";
//

@Component({
  selector: 'coin',
  templateUrl: './coin.component.html',
  // styleUrls: ['./coin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoinComponent extends BaseComponent implements OnInit {


  transferList = [
    {},
    {},
    {}
  ];

  coinCount = 1.2;

  coinId = 0;

  coinName = Config.COIN_LIST[0].name;

  start = 0;

  count = 20;


  ngOnInit() {
    this.setTitle('ELA');
  }

  initData(){
    this.walletManager.getBalanceFun((data)=>{
      this.coinCount = data.balance;
    });
    // this.walletManager.getAllTransaction(this.start,this.count,'',(data)=>{
    //
    // });
  }

  onItem(item) {
    this.Go(RecordinfoComponent,{id:this.coinId,txId:item.txId});

    // this.navCtrl.push('coin', {
    //   'id':0
    // });
    //this.router.Go_v2({path: '/coin/' + this.coinId + '/record'});
  }

  onNext(type) {
    switch (type) {
      case 1:
        this.Go(ReceiveComponent,{id:this.coinId});
        break;
      case 2:
        this.Go(TransferComponent,{id:this.coinId});
        break;
      case 3:
        this.Go(RecordComponent,{id:this.coinId});
        break;
    }
  }


}
