import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';
import {CoinComponent} from "../../coin/coin.component";
import {CoinListComponent} from "../../coin/coin-list/coin-list.component";
import { Config } from '../../../providers/Config';
import {WalltelistPage} from '../../../pages/walltelist/walltelist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseComponent implements OnInit {
  elaPer:any;
  tempElaPer:any;
  idChainPer:any;
  tempIdChinaPer:any;
  wallet = {
    name: 'myWallet',
    showBalance: true
  };
  ElaObj ={"name":"ELA","balance":0};
  coinList = []

  ngOnInit() {
         setInterval(()=>{
               this.elaPer = this.tempElaPer;
               this.idChainPer = this.tempIdChinaPer;
        },0);
    this.getAllMasterWallets();
    this.events.subscribe("wallte:update",(item)=>{
      console.log("Selected Item", item);
    });
    this.events.subscribe('home:update', () => {
           this.getElaBalance(this.ElaObj);
           this.localStorage.get('coinListCache').then((val)=>{
            let coinListCache = JSON.parse(val);
            //this.coinList = [];
            for (let coin in coinListCache) {
              // this.walletManager.getBalance(coin,(data)=>{
              //   this.coinList.push({name: coin, balance: data.balance/Config.SELA});
              // })
              this.getSubBalance(coin);
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
        // this.native.scan().then((q)=>{
        //  //this.Go(TransferComponent,{address:q.qrcode});
        // }).catch(err=>{
        //   this.toast('error-address');
        // });
        this.Go(WalltelistPage);
        break;
      case 1:
        this.Go(CoinListComponent);
        break;
    }
  }

  onItem(item) {
    this.Go(CoinComponent, {name: item.name,"elaPer":this.tempElaPer,"idChainPer":this.tempIdChinaPer});
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
     this.getElaBalance(this.ElaObj);
         // wallet balance
    this.localStorage.get('coinListCache').then((val)=>{
      let coinListCache = JSON.parse(val);
      for (let coin in coinListCache) {
         this.sycIdChain();
         this.getSubBalance(coin);
      }
    });
    })
  }

  getSubBalance(coin){
    this.walletManager.getBalance(coin, (data)=>{
      if(this.coinList.length === 0){
          this.coinList.push({name: coin, balance: data.balance/Config.SELA});
      }else{
            let index = this.getCoinIndex(coin);
            if(index!=-1){
               let item = this.coinList[index];
                   item["balance"] =  data.balance/Config.SELA;
                   this.coinList.splice(index,1,item);

            }else{
                   this.coinList.push({name: coin, balance: data.balance/Config.SELA});
            }
      }

    })
  }

  getCoinIndex(coin){

   for(let index = 0; index <this.coinList.length;index++){
             let item = this.coinList[index];
              if(coin === item["name"]){
                    return index;
              }
   }
   return -1;
  }

  sycEla(){

    this.walletManager.registerWalletListener("ELA",(result)=>{
           if(result["OnBlockSyncStopped"] === "OnBlockSyncStopped"){
              this.tempElaPer = 1;
           }else{
            this.tempElaPer= result["progress"].toFixed(2);
           }

           if(this.tempElaPer === 1){
            this.getElaBalance(this.ElaObj);
           }

    });
  }

  sycIdChain(){
    this.walletManager.registerWalletListener("IdChain",(result)=>{
      if(result["OnBlockSyncStopped"] === "OnBlockSyncStopped"){
        this.tempIdChinaPer = 1;
      }else{
        this.tempIdChinaPer  = result["progress"].toFixed(2);
      }

      if(this.tempIdChinaPer === 1){
               this.getSubBalance("IdChain");
      }
    });
  }
}
