import {Component,ViewChild} from '@angular/core';
import { NavController, NavParams,Navbar,Events } from 'ionic-angular';
import {WalletManager} from '../../providers/WalletManager';
import {Native} from "../../providers/Native";
import { Config } from '../../providers/Config';
import { Util } from '../../providers/Util';
import {TransferComponent} from "./transfer/transfer.component";
import {CoinSelectComponent} from "./coin-select/coin-select.component";
import {WithdrawComponent} from "./withdraw/withdraw.component";
import {ReceiveComponent} from "./receive/receive.component";
import {RecordinfoComponent} from "./recordinfo/recordinfo.component";



@Component({
  selector: 'coin',
  templateUrl: './coin.component.html',
})
export class CoinComponent{
  @ViewChild(Navbar) navBar: Navbar;
  public masterWalletInfo = {};
  masterWalletId:string = "1";
  transferList = [];

  coinCount = 0;

  coinId = 0;

  coinName = "";
  pageNo =0;
  start = 0;

  textShow = '';

  elaPer:any;
  idChainPer:any;
  isShowMore = false;
  MaxCount = 0;
  isNodata:boolean = false;
  constructor(public navCtrl: NavController,public navParams: NavParams, public walletManager: WalletManager,public native: Native,public events: Events) {
            this.init();
  }
  init() {
    this.masterWalletId = Config.getCurMasterWalletId();
    this.walletManager.getMasterWalletBasicInfo(this.masterWalletId,(data)=>{
                 if(data["success"]){
                    console.log("===getMasterWalletBasicInfo==="+JSON.stringify(data));
                    let item = JSON.parse(data["success"])["Account"];
                    this.masterWalletInfo = item;
                 }else{
                    alert("=======getMasterWalletBasicInfo====error====="+JSON.stringify(data));
                 }
    });
    // this.setLeftIcon("",()=>{
    //   this.events.publish("home:update");
    //   this.Back();
    // });
    this.coinName = this.navParams.get("name");
    this.elaPer = this.navParams.get("elaPer") || 0;
    this.idChainPer = this.navParams.get("idChainPer") || 0;
    if (this.coinName == 'ELA') {
      this.textShow = 'text-recharge';
    }else{
      this.textShow = 'text-withdraw';
    }
    this.initData();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e)=>{
      console.log("========back=======");
      this.events.publish("home:update");
      this.navCtrl.pop();
    };
  }

  initData(){
    this.walletManager.getBalance(this.masterWalletId,this.coinName, (data)=>{
      if(!Util.isNull(data["success"])){
        console.log("====getBalance=="+JSON.stringify(data));
        this.coinCount = data["success"]/Config.SELA;
      }else{
         alert("====getBalance==error="+JSON.stringify(data));
      }
    });
    this.getAllTx();
  }

  getAllTx(){
    this.walletManager.getAllTransaction(this.masterWalletId,this.coinName, this.start, '', (data) => {
      if(data["success"]){
      let allTransaction = JSON.parse(data['success']);
      let transactions = allTransaction['Transactions'];
      this.MaxCount = allTransaction['MaxCount'];
      if(this.MaxCount>0){
         this.isNodata = false;
      }else{
         this.isNodata = true;
      }
      if(!transactions){
          this.isShowMore = false;
          return;
      }
      for (let key in transactions) {
        let transaction = transactions[key];
        // let timestamp = transaction['Timestamp']*1000;

        // let txId = transaction['TxHash'];
        let summary = transaction['Summary'];
        let timestamp = summary['Timestamp']*1000;
        let datetime = Util.dateFormat(new Date(timestamp));
        let txId = summary['TxHash'];
        let incomingAmount = summary["Incoming"]['Amount'];
        let outcomingAmount = summary["Outcoming"]['Amount'];
        let outcomingAddress = summary["Outcoming"]['ToAddress'];
        let balanceResult = incomingAmount - outcomingAmount;
        let resultAmount = 0;
        if (outcomingAmount === 0 && outcomingAddress === "") {
          resultAmount = balanceResult;
        } else {
          resultAmount = balanceResult - summary['Fee'];
        }
        let payStatusIcon = "";
        if (balanceResult > 0) {
          payStatusIcon = './assets/images/tx-state/icon-tx-received-outline.svg';
        } else if(balanceResult < 0) {
          payStatusIcon = './assets/images/tx-state/icon-tx-sent.svg';
        } else if(balanceResult == 0) {
          payStatusIcon = './assets/images/tx-state/icon-tx-moved.svg';
        }
        let status = '';
        switch(summary["Status"])
        {
          case 'Confirmed':
            status = 'Confirmed'
            break;
          case 'Pending':
            status = 'Pending'
            break;
          case 'Unconfirmed':
            status = 'Unconfirmed'
            break;
        }
        let transfer = {
          "name": this.coinName,
          "status": status,
          "type": summary["Type"],
          "balance": balanceResult/Config.SELA,
          "resultAmount": resultAmount/Config.SELA,
          "datetime": datetime,
          "timestamp": timestamp,
          "payfees": summary['Fee']/Config.SELA,
          "txId": txId,
          "payStatusIcon": payStatusIcon
        }
        this.transferList.push(transfer);
      }
      }else{
          alert("====getAllTransaction====error");
      }
    });
  }

  onItem(item) {
    this.native.Go(this.navCtrl,RecordinfoComponent, {chainId: this.coinName, txId: item.txId});
  }

  onNext(type) {
    switch (type) {
      case 1:
        this.native.Go(this.navCtrl,ReceiveComponent, {id: this.coinId, chianId: this.coinName});
        break;
      case 2:
      if (this.coinName == 'ELA') {
        // if(this.elaPer != 1){
        //   this.messageBox("text-ela-per-message");
        //   return;
        // }
        this.native.Go(this.navCtrl,TransferComponent, {id: this.coinId, chianId: this.coinName,"walletInfo":this.masterWalletInfo});
      }else{
        // if(this.idChainPer != 1){
        //   this.messageBox("text-ela-per-message");
        //   return;
        // }
        this.native.Go(this.navCtrl,TransferComponent, {id: this.coinId, chianId: this.coinName});
      }

        break;
      case 3:
        if (this.coinName == 'ELA') {
          // if(this.elaPer != 1){
          //   this.messageBox("text-ela-per-message");
          //   return;
          // }
          this.native.Go(this.navCtrl,CoinSelectComponent, {chianId: this.coinName});
        }else{
          // if(this.idChainPer != 1){
          //   this.messageBox("text-ela-per-message");
          //   return;
          // }
          this.native.Go(this.navCtrl,WithdrawComponent, {chianId: this.coinName});
        }
        break;
    }
  }

  clickMore(){
    this.pageNo++;
    this.start = this.pageNo*20;
    if(this.start >= this.MaxCount){
      this.isShowMore = false;
      return;
    }
    this.isShowMore = true;
    this.getAllTx();
  }

  doRefresh(refresher){
    this.pageNo = 0;
    this.getAllTx();
    setTimeout(() => {
      refresher.complete();
    },1000);
  }
}
