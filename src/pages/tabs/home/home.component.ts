import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';
import {CoinComponent} from "../../coin/coin.component";
import {CoinListComponent} from "../../coin/coin-list/coin-list.component";
import { Config } from '../../../providers/Config';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseComponent implements OnInit {
  sycObj={"elaPer":"0","idChain":"0"};
  wallet = {
    name: 'myWallet',
    showBalance: true
  };
  ElaObj ={"name":"ELA","balance":0};
  coinList = []

  ngOnInit() {
    this.getAllMasterWallets();
    this.events.subscribe('home:update', () => {
           this.getElaBalance(this.ElaObj);
           this.localStorage.get('coinListCache').then((val)=>{
            let coinListCache = JSON.parse(val);
            this.coinList = [];
            for (let coin in coinListCache) {
              this.walletManager.getBalance(coin,(data)=>{
                this.coinList.push({name: coin, balance: data.balance/Config.SELA});
              })
            }
          });
    });


    // wallet name
    this.localStorage.getWallet().then((val) => {
      if (val) {
        this.wallet.name = JSON.parse(val).name;
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
      this.ElaObj.balance = data.balance/Config.SELA;
    })
  }

  getAllMasterWallets(){
    this.walletManager.getAllMasterWallets((result)=>{
      this.getAllSubWallets();
    });
  }

  getAllSubWallets(){
    this.walletManager.getAllSubWallets(()=>{
      this.sycEla();
      this.sycIdChain();
     this.getElaBalance(this.ElaObj);
         // wallet balance
    this.localStorage.get('coinListCache').then((val)=>{
      let coinListCache = JSON.parse(val);
      for (let coin in coinListCache) {
         this.getSubBalance(coin);
      }
    });
    })
  }

  getSubBalance(coin){
    this.walletManager.getBalance(coin, (data)=>{
      this.coinList.push({name: coin, balance: data.balance/Config.SELA});
    })
  }

  sycEla(){
    this.walletManager.registerWalletListener("ELA",(result)=>{
           this.sycObj.elaPer = result["progress"];
           //console.log("========sycEla"+JSON.stringify(result)+"this.elaPer"+this.elaPer);
    });
  }

  sycIdChain(){
    this.walletManager.registerWalletListener("IdChain",(result)=>{
      this.sycObj.idChain = result["progress"];
      console.log("========sycIdChain"+JSON.stringify(result));
    });
  }
}
