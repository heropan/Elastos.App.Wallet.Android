import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';
import {CoinComponent} from "../../coin/coin.component";
//import {ManagerComponent} from "../../wallet/manager/manager.component";
import {CoinListComponent} from "../../coin/coin-list/coin-list.component";
//import {TransferComponent} from "../../coin/transfer/transfer.component";
import {Config} from "../../../providers/Config";
//declare var cordova:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
   //styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  wallet = {
    name: 'myWallet',
    showBalance: true
  };

  coinList = []

  ngOnInit() {
    // wallet name
    this.localStorage.getWallet().then((val) => {
      if (val) {
        this.wallet.name = JSON.parse(val).name;
      }
    });
    // wallet balance
    for (let coin in Config.COIN_LIST) {
      // console.log("=====", Config.COIN_LIST[coin]);
      // this.walletManager.getBalanceFun((data) => {
      //   Config.COIN_LIST[coin].balance = data
      // })
      this.coinList.push(Config.COIN_LIST[coin]);
    }
  }

  onOpen() {
    this.wallet.showBalance = !this.wallet.showBalance;
  }

  onClick(type){
    switch (type){
      case 0:
        this.native.scan().then((q)=>{
         //this.Go(TransferComponent,{address:q.qrcode});
        }).catch(err=>{
          this.toast('error-address');
        });
        break;
      case 1:
        this.Go(CoinListComponent);
        break;
    }
  }
  
  onItem(item) {
    this.Go(CoinComponent,{id:0});
    //this.router.Go_v2({path: 'coin', id: item.id});
  }

}
