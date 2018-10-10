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
    this.wallet["name"] = Config.getWalletName(this.masterWalletId);
    this.goPayment();
    setInterval(()=>{
      this.elaPer = Config.getMasterPer(this.masterWalletId,"ELA");;
      this.idChainPer = Config.getMasterPer(this.masterWalletId,"IdChain");
    },500);
    this.getAllSubWallets();
    this.events.subscribe("wallte:update",(item)=>{
      this.masterWalletId = item;
      this.wallet["name"] = Config.getWalletName(this.masterWalletId);
      Config.setCurMasterWalletId(this.masterWalletId);
      this.elaPer = Config.getMasterPer(this.masterWalletId,"ELA");
      this.idChainPer =Config.getMasterPer(this.masterWalletId,"IdChain");
      setInterval(()=>{
        this.masterWalletId =  Config.getCurMasterWalletId();
        this.elaPer = Config.getMasterPer(this.masterWalletId,"ELA");
        this.idChainPer = Config.getMasterPer(this.masterWalletId,"IdChain");
      },500);
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
      if(this.masterWalletId != result["MasterWalletID"] && "ELA" === result["ChaiID"]){
        return;
      }

      if(result["Action"] === "OnTransactionStatusChanged"){
        if (result['confirms'] == 1) {
          this.popupProvider.ionicAlert('confirmTitle', 'confirmTransaction').then((data) => {
          });
         }
      }

      if(result["Action"] === "OnBalanceChanged"){
        if(!Util.isNull(result["Balance"])){
          console.log("OnBalanceChanged="+JSON.stringify(result));
          console.log("OnBalanceChanged="+result["Balance"]);
          this.ElaObj.balance = result["Balance"]/Config.SELA;
          this.updateValue();
         }
       }
       if(result["Action"] === "OnBlockSyncStopped"){
              //this.tempElaPer = 1;
              this.tempElaPer = Config.getMasterPer(this.masterWalletId,"ELA");
           }else if(result["Action"] === "OnBlockSyncStarted"){
              this.tempElaPer = Config.getMasterPer(this.masterWalletId,"ELA");
           }else if(result["Action"] === "OnBlockHeightIncreased"){
             if(result["progress"]){
              this.tempElaPer= result["progress"];
              Config.setMasterPer(this.masterWalletId,"ELA",this.tempElaPer);
             }

           }

           if(this.tempElaPer === 1){
             //this.getElaBalance(this.ElaObj);
             this.tempElaPer = Config.getMasterPer(this.masterWalletId,"ELA");
           }
    });
  }

  sycIdChain(coin){
    this.walletManager.registerWalletListener(this.masterWalletId,coin,(result)=>{
      console.log("====IdChain==="+result['confirms']);

      if(this.masterWalletId != result["MasterWalletID"] && coin === result["ChaiID"]){
                   return;
      }
      if(result["Action"] === "OnBalanceChanged"){
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
      }

      if(result["Action"] === "OnTransactionStatusChanged"){
        if (result['confirms'] == 1) {
          this.popupProvider.ionicAlert('confirmTitle', 'confirmTransaction').then((data) => {
          });
        }
       }

        if(result["Action"] === "OnBlockSyncStopped"){
          //this.tempIdChinaPer = 1;
          this.tempIdChinaPer = Config.getMasterPer(this.masterWalletId,coin);
        }else if(result["Action"] === "OnBlockSyncStarted"){
          this.tempIdChinaPer = Config.getMasterPer(this.masterWalletId,coin);
        }else if(result["Action"] === "OnBlockHeightIncreased"){
          this.tempIdChinaPer  = result["progress"];
          Config.setMasterPer(this.masterWalletId,coin,this.tempIdChinaPer);
        }

        if(this.tempIdChinaPer === 1){
                 //this.getSubBalance("IdChain");
          this.tempIdChinaPer = Config.getMasterPer(this.masterWalletId,coin);
        }
    });
  }
}
