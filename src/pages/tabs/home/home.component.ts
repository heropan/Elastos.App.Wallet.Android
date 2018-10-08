import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';
import {CoinComponent} from "../../coin/coin.component";
import {CoinListComponent} from "../../coin/coin-list/coin-list.component";
import { Config } from '../../../providers/Config';
import { PaymentConfirmComponent } from '../../coin/payment-confirm/payment-confirm.component';
import {WalltelistPage} from '../../../pages/walltelist/walltelist';
import {Util} from '../../../providers/Util';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseComponent implements OnInit {
  masterWalletId:string ="1";
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
    this.masterWalletId =  Config.getCurMasterWalletId();
    this.goPayment();
    setInterval(()=>{
      this.elaPer = this.tempElaPer;
      this.idChainPer = this.tempIdChinaPer;
    },100);
    this.getAllSubWallets();
    this.events.subscribe("wallte:update",(item)=>{
      this.tempElaPer = 0;
      this.tempIdChinaPer = 0;
      this.elaPer = 0;
      this.idChainPer = 0;
      setInterval(()=>{
        this.elaPer = this.tempElaPer;
        this.idChainPer = this.tempIdChinaPer;
      },100);
      console.log("Selected Item", item);
      this.masterWalletId = item;
      Config.setCurMasterWalletId(this.masterWalletId);
      this.getAllSubWallets();
    });
    this.events.subscribe('home:update', () => {
           this.masterWalletId =  Config.getCurMasterWalletId();
           this.getElaBalance(this.ElaObj);
           this.localStorage.get('coinListCache').then((val)=>{
            if(Util.isEmptyObject(JSON.parse(val))){
               this.coinList = [];
               return;
            }
            let coinListCache = JSON.parse(val);
            for (let coin in coinListCache) {
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

  goPayment() {
    this.localStorage.get('payment').then((val)=>{
      if (val) {
        this.localStorage.remove('payment');
        this.Go(PaymentConfirmComponent, JSON.parse(val));
      }
    });
  }

  onClick(type){
    switch (type){
      case 0:
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
    this.walletManager.getBalance(this.masterWalletId,item.name,(data)=>{
      if(!Util.isNull(data["success"])){
        console.log("getBalance="+JSON.stringify(data));
        this.ElaObj.balance = data["success"]/Config.SELA;
      }else{
        alert("getElaBalance=error:"+JSON.stringify(data));
      }
    });
  }

  getAllSubWallets(){
    this.walletManager.getAllSubWallets(this.masterWalletId,(data)=>{
      if(data["success"]){
        console.log("getAllSubWallets="+JSON.stringify(data));
        this.sycEla();
        this.getElaBalance(this.ElaObj);
        this.localStorage.get('coinListCache').then((val)=>{
          let coinListCache = JSON.parse(val);
          for (let coin in coinListCache) {
             this.sycIdChain(coin);
             this.getSubBalance(coin);
          }
        });
      }else{
        alert("getAllSubWallets=error:"+JSON.stringify(data));
      }
    });
  }

  getSubBalance(coin){
    this.walletManager.getBalance(this.masterWalletId,coin, (data)=>{
      console.log("getSubBalance="+JSON.stringify(data));
      if(!Util.isNull(data["success"])){
         if(this.coinList.length === 0){
          this.coinList.push({name: coin, balance: data["success"]/Config.SELA});
         }else{
            let index = this.getCoinIndex(coin);
            if(index!=-1){
               let item = this.coinList[index];
                   item["balance"] =  data["success"]/Config.SELA;
                   this.coinList.splice(index,1,item);

            }else{
                   this.coinList.push({name: coin, balance: data["success"]/Config.SELA});
            }
         }
      }else{
               alert("getSubBalance=error"+JSON.stringify(data));
      }
    });
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

    this.walletManager.registerWalletListener(this.masterWalletId,"ELA",(result)=>{

      if (result['confirms'] == 1) {
        this.popupProvider.ionicAlert('confirmTitle', 'confirmTransaction').then((data) => {
        });
      }
          if(!Util.isNull(result["Balance"])){
            console.log("getBalance="+JSON.stringify(result));
            this.ElaObj.balance = result["Balance"]/Config.SELA;
          }

          if(result["OnBlockSyncStopped"] === "OnBlockSyncStopped"){
              //this.tempElaPer = 1;
           }else{
            this.tempElaPer= result["progress"];
           }

           if(this.tempElaPer === 1){
             //this.getElaBalance(this.ElaObj);
           }
    });
  }

  sycIdChain(coin){
    this.walletManager.registerWalletListener(this.masterWalletId,coin,(result)=>{
      console.log("====IdChain==="+result['confirms']);

      if(!Util.isNull(result["Balance"])){
        if(this.coinList.length === 0){
          this.coinList.push({name:coin, balance: result["Balance"]/Config.SELA});
         }else{
            let index = this.getCoinIndex(coin);
            if(index!=-1){
               let item = this.coinList[index];
                   item["balance"] = result["Balance"]/Config.SELA;
                   this.coinList.splice(index,1,item);

            }else{
                  this.coinList.push({name: coin, balance: result["Balance"]/Config.SELA});
            }
         }
      }

        if (result['confirms'] == 1) {
          this.popupProvider.ionicAlert('confirmTitle', 'confirmTransaction').then((data) => {
          });
        }

        if(result["OnBlockSyncStopped"] === "OnBlockSyncStopped"){
          //this.tempIdChinaPer = 1;
        }else{
          this.tempIdChinaPer  = result["progress"];
        }

        if(this.tempIdChinaPer === 1){
                 //this.getSubBalance("IdChain");
        }
    });
  }
}
