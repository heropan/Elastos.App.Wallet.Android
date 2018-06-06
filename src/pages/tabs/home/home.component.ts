import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {CoinComponent} from "../../coin/coin.component";
//import {ManagerComponent} from "../../wallet/manager/manager.component";
import {CoinListComponent} from "../../coin/coin-list/coin-list.component";
//import {TransferComponent} from "../../coin/transfer/transfer.component";
//declare var cordova:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
   //styleUrls: ['./home.component.scss']
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
    // this.walletManager.importMnemonic("wallet abc", ()=> {
    //   alert("成功啦");
    // });
    // this.walletManager.print("123",function () {
    //     alert("成功啦");
    // })

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
        // this.walletManager.createMasterWallet("11111111111","12345556666666",()=>{
        //      alert("主钱包");
        //      this.createSubWallet();
            
        // })
        break;

    }
  }

  createSubWallet(){
    this.walletManager.createSubWallet(0,"Ela",0,"12345556666666",false,0,()=>{
      alert("子钱包");
    });
  }

  onItem(item) {
    this.Go(CoinComponent,{id:0});
    //this.router.Go_v2({path: 'coin', id: item.id});
  }

}
