import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';

declare var cordova:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  wallet = {
    name: '我的大钱包',
    showBalance: true
  };

  coinList = [
    {id: 0, name: 'ELA', balance: 20.2}
  ];

  ngOnInit() {
    this.walletManager.importMnemonic("wallet abc", ()=> {
      alert("成功啦");
    });
    // this.walletManager.print("123",function () {
    //     alert("成功啦");
    // })

  }

  onOpen() {
    this.wallet.showBalance = !this.wallet.showBalance;
  }

  onWallet() {
    this.router.Go_v2({path: '/wallet/manager'});
  }

  onItem(item) {
    this.router.Go_v2({path: 'coin', id: item.id});
  }

}
