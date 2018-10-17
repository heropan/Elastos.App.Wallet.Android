import { Component} from '@angular/core';
import {Config} from '../../../providers/Config';
import { Util } from '../../../providers/Util';
import { NavController, NavParams} from 'ionic-angular';
import {WalletManager} from '../../../providers/WalletManager';
import {Native} from "../../../providers/Native";
@Component({
  selector: 'app-recordinfo',
  templateUrl: './recordinfo.component.html',
})
export class RecordinfoComponent{
  masterWalletId:string = "1";
  transactionRecord: any = {};
  start = 0;
  blockchain_url = Config.BLOCKCHAIN_URL;
  constructor(public navCtrl: NavController,public navParams: NavParams, public walletManager: WalletManager,public native :Native){
    this.init();
  }
  init() {
    this.masterWalletId = Config.getCurMasterWalletId();
    let txId = this.navParams.get("txId");
    let chainId = this.navParams.get("chainId");
    this.walletManager.getAllTransaction(this.masterWalletId,chainId, this.start, txId, (data) => {
      if(data["success"]){
        console.log("====getAllTransaction====="+JSON.stringify(data));
        let allTransaction = JSON.parse(data['success']);
        let transactions = allTransaction['Transactions'];
        let transaction = transactions[0];
        // let timestamp = transaction['Timestamp']*1000;
        let summary = transaction['Summary'];
        let timestamp = summary['Timestamp']*1000;
        let datetime = Util.dateFormat(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
        let incomingAmount = summary["Incoming"]['Amount'];
        let outcomingAmount = summary["Outcoming"]['Amount'];
        let incomingAddress = summary["Incoming"]['ToAddress'];
        let outcomingAddress = summary["Outcoming"]['ToAddress'];
        let balanceResult = incomingAmount - outcomingAmount;
        let resultAmount = balanceResult - summary['Fee'];
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
        this.transactionRecord = {
          name: chainId,
          status: status,
          balance: balanceResult/Config.SELA,
          incomingAmount: incomingAmount/Config.SELA,
          outcomingAmount: outcomingAmount/Config.SELA,
          resultAmount: resultAmount/Config.SELA,
          incomingAddress: incomingAddress,
          outcomingAddress: outcomingAddress,
          txId: txId,
          transactionTime: datetime,
          timestamp: timestamp,
          payfees: summary['Fee']/Config.SELA,
          confirmCount: summary["ConfirmStatus"],
          remark: summary["Remark"]
        }
      }else{
          alert("======getAllTransaction====error"+JSON.stringify(data));
      }

    });
  }

  onNext(address){
    this.native.copyClipboard(address);
    this.native.toast_trans('copy-ok');
  }

  tiaozhuan(txId){
   self.location.href=this.blockchain_url + 'tx/' + txId;
  }

}
