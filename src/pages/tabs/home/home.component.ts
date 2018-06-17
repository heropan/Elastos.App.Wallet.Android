import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';
import {CoinComponent} from "../../coin/coin.component";
import {CoinListComponent} from "../../coin/coin-list/coin-list.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseComponent implements OnInit {

  wallet = {
    name: 'myWallet',
    showBalance: true
  };
  ElaObj ={"name":"ELA","balance":0};
  coinList = []

  ngOnInit() {

    this.events.subscribe('home:update', () => {
           this.getElaBalance(this.ElaObj);
           this.localStorage.get('coinListCache').then((val)=>{
            let coinListCache = JSON.parse(val);
            this.coinList = [];
            for (let coin in coinListCache) {
              this.walletManager.getBalance(coin,(data)=>{
                this.coinList.push({name: coin, balance: data.balance});
              })
            }
          });
    });

    this.getElaBalance(this.ElaObj);
    // wallet name
    this.localStorage.getWallet().then((val) => {
      if (val) {
        this.wallet.name = JSON.parse(val).name;
      }
    });
    // wallet balance
    this.localStorage.get('coinListCache').then((val)=>{
      let coinListCache = JSON.parse(val);
      for (let coin in coinListCache) {
        this.walletManager.getBalance(coin, (data)=>{
          this.coinList.push({name: coin, balance: data.balance});
        })
      }
    });
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
    this.Go(CoinComponent, {name: item.name});
  }

  getElaBalance(item){
    this.walletManager.getBalance(item.name,(data)=>{
      this.ElaObj.balance = data.balance;
    })
  }
}
