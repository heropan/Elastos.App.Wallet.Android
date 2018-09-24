import {BaseComponent} from '../../app/BaseComponent';
import {Component, ViewEncapsulation, OnInit} from '@angular/core';
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
  encapsulation: ViewEncapsulation.None
})
export class CoinComponent extends BaseComponent implements OnInit {
  public masterWalletInfo = {};
  masterWalletId:string = "1";
  transferList = [];

  coinCount = 0;

  coinId = 0;

  coinName = "";

  start = 0;

  count = Config.LIST_COUNT;

  textShow = '';

  elaPer:any;
  idChainPer:any;

  ngOnInit() {
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
    this.setLeftIcon("",()=>{
      this.events.publish("home:update");
      this.Back();
    });
    this.coinName = this.getNavParams().get("name");
    this.elaPer = this.getNavParams().get("elaPer") || 0;
    this.idChainPer = this.getNavParams().get("idChainPer") || 0;
    this.setTitle(this.coinName);
    if (this.coinName == 'ELA') {
      this.textShow = 'text-recharge';
    }else{
      this.textShow = 'text-withdraw';
    }
    this.initData();
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
    this.walletManager.getAllTransaction(this.masterWalletId,this.coinName, this.start, '', (data) => {
      if(data["success"]){
          console.log("====getAllTransaction===="+JSON.stringify(data));
      let allTransaction = JSON.parse(data['success']);
      let transactions = allTransaction['Transactions'];
      for (let key in transactions) {
        let transaction = transactions[key];
        let timestamp = transaction['Timestamp']*1000;
        let datetime = Util.dateFormat(new Date(timestamp));
        let txId = transaction['TxHash'];
        let summary = transaction['Summary'];
        let incomingAmount = summary["Incoming"]['Amount'];
        let outcomingAmount = summary["Outcoming"]['Amount'];
        let balanceResult = incomingAmount - outcomingAmount;
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
          "datetime": datetime,
          "timestamp": timestamp,
          "txId": txId
        }
        this.transferList.push(transfer);
      }
      }else{
          alert("====getAllTransaction====error");
      }
    });
  }

  onItem(item) {
    this.Go(RecordinfoComponent, {chainId: this.coinName, txId: item.txId});
  }

  onNext(type) {
    switch (type) {
      case 1:
        this.Go(ReceiveComponent, {id: this.coinId, chianId: this.coinName});
        break;
      case 2:
      if (this.coinName == 'ELA') {
        // if(this.elaPer != 1){
        //   this.messageBox("text-ela-per-message");
        //   return;
        // }
        this.Go(TransferComponent, {id: this.coinId, chianId: this.coinName,"walletInfo":this.masterWalletInfo});
      }else{
        // if(this.idChainPer != 1){
        //   this.messageBox("text-ela-per-message");
        //   return;
        // }
        this.Go(TransferComponent, {id: this.coinId, chianId: this.coinName});
      }

        break;
      case 3:
        if (this.coinName == 'ELA') {
          // if(this.elaPer != 1){
          //   this.messageBox("text-ela-per-message");
          //   return;
          // }
          this.Go(CoinSelectComponent, {chianId: this.coinName});
        }else{
          // if(this.idChainPer != 1){
          //   this.messageBox("text-ela-per-message");
          //   return;
          // }
          this.Go(WithdrawComponent, {chianId: this.coinName});
        }
        break;
    }
  }


}
