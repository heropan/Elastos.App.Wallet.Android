import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';
import { PopupComponent } from "ngx-weui";
import {Util} from "../../../providers/Util";
import { Config } from '../../../providers/Config';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html'
})
export class PaymentConfirmComponent extends BaseComponent implements OnInit {

  transfer: any = {
    toAddress: '',
    amount: '',
    memo: '',
    fee: 0,
    payPassword:'',
    remark:'',
  };

  chianId: string = 'ELA';

  feePerKb = 10000;

  rawTransaction: '';

  SELA = Config.SELA;
  
  txId: string;


  ngOnInit(){
    this.setTitleByAssets('text-payment-confirm');
    this.setHeadDisPlay({left:false});
  }

  onClick(){
    if (!Util.password(this.transfer.payPassword)) {
      this.toast("text-pwd-validator");
      return;
    }
    // this.createTransaction();
  }

  createTransaction(){
    // this.walletManager.createTransaction(this.chianId, "",
    //   this.transfer.toAddress,
    //   this.transfer.amount*Config.SELA,
    //   this.transfer.memo,
    //   this.transfer.remark,
    //   (data)=>{
    //     this.rawTransaction = data['transactionId'].toString();
    //     this.getFee();
    //   });
  }

  getFee(){
    // this.walletManager.calculateTransactionFee(this.chianId, this.rawTransaction, this.feePerKb, (data) => {
    //   this.transfer.fee = data['fee'];
    // });
  }

  sendRawTransaction(){
    // this.walletManager.sendRawTransaction(this.chianId, this.rawTransaction, this.transfer.fee, this.transfer.payPassword, (data) => {
    //   this.txId = JSON.parse(data["json"])["TxHash"];
    //   if (data['ERRORCODE'] == undefined) {
    //     this.walletManager.registerWalletListener(this.chianId, (data) => {
    //       if (data['confirms'] == 1) {
    //         this.popupProvider.ionicAlert('confirmTitle', 'confirmTransaction').then((data) => {
    //         });
    //       }
    //     });
    //   } else {
    //     this.toast('text-password-error');
    //   }
    // });
  }

}
