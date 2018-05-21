import {BaseComponent} from '../../app/BaseComponent';
import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { Config } from '../../providers/Config';
import {IonicPage} from "ionic-angular";
import {RecordComponent} from "./record/record.component";
import {TransferComponent} from "./transfer/transfer.component";
import {ReceiveComponent} from "./receive/receive.component";
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


  ngOnInit() {
    this.setTitle('ELA');
  }

  onItem(item) {
    this.Go(RecordComponent,{id:this.coinId});
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
    }
  }


}
