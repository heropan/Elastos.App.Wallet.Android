import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {ContactListComponent} from "../../contacts/contact-list/contact-list.component";
import {TabsComponent} from "../../tabs/tabs.component";
import {Util} from "../../../providers/Util";
import { PopupComponent } from "ngx-weui";
import { Config } from '../../../providers/Config';
import {ApiUrl} from "../../../providers/ApiUrl"
@Component({
  selector: 'app-transfer',
  templateUrl: './withdraw.component.html'})
export class WithdrawComponent extends BaseComponent implements OnInit {

  @ViewChild('subscribe') subPopup: PopupComponent;


  transfer: any = {
    toAddress: '',
    amount: '',
    memo: '',
    fee: 0,
    payPassword:'',
    remark:'',
  };

  mainchain: any = {
    accounts: '',
    amounts: '',
    index: 0,
  };


  balance = 0;

  chianId: string;

  feePerKb = 10000;

  rawTransaction: '';

  SELA = Config.SELA;

  ngOnInit() {
    this.setTitleByAssets('text-withdraw');
    let transferObj =this.getNavParams().data;
    this.chianId = transferObj["chianId"];
    this.initData();

    this.setRightIcon('./assets/images/icon/ico-scan.svg', () => {
      this.native.scan().then((q)=>{
        this.transfer.toAddress = q.text.split(":")[1];
      }).catch(err=>{
          this.toast('error-address');
      });
    });

    this.setHeadDisPlay({right: true});
    this.subPopup.config = {cancel:'',confirm:'',backdrop:false,is_full:false};
  }

  initData(){
    this.walletManager.getBalance(this.chianId, (data)=>{
      this.balance = data.balance;
    });
  }


  onClick(type) {
    switch (type) {
      // case 1:
      //   this.Go(ContactListComponent);
      //   break;
      case 2:   // 转账
        this.checkValue();
        break;
      case 3:
        this.subPopup.close();
        break;
      case 4:
        this.sendRawTransaction();
        break;
    }
  }

  checkValue() {
    if(Util.isNull(this.transfer.toAddress)){
      this.toast('correct-address');
      return;
    }
    if (!Util.isAddressValid(this.transfer.toAddress)) {
      this.messageBox("contact-address-digits");
      return;
    }
    if(Util.number(this.transfer.amount)){
      this.toast('correct-amount');
      return;
    }

    if(this.transfer.amount > this.balance){
      this.toast('error-amount');
      return;
    }
    // this.createWithdrawTransaction();
    this.subPopup.show().subscribe((res: boolean) => {
    });
  }


  createWithdrawTransaction(){
    this.walletManager.createWithdrawTransaction(this.chianId, "",
      this.transfer.toAddress,
      this.transfer.amount*Config.SELA,
      this.mainchain.accounts,
      this.mainchain.amounts,
      this.mainchain.index,
      this.transfer.fee,
      this.transfer.memo,
      this.transfer.remark,
      (data)=>{
        this.rawTransaction = data['transactionId'].toString();
        this.getFee();
      });
  }

  getFee(){
    this.walletManager.calculateTransactionFee(this.chianId, this.rawTransaction, this.feePerKb, (data) => {
      this.transfer.fee = data['fee'];
    });
  }

  sendRawTransaction(){
    if (!Util.password(this.transfer.payPassword)) {
      this.toast("text-pwd-validator");
      return;
    }
    this.walletManager.sendRawTransaction(this.chianId, this.rawTransaction, this.transfer.fee, this.transfer.payPassword, (data) => {
      // alert("===========sendRawTransaction " + JSON.stringify(data['ERRORCODE']));
      if (data['ERRORCODE'] == undefined) {
        this.walletManager.registerWalletListener(this.chianId, (data) => {
          // alert("registerWalletListener=====" + JSON.stringify(data));
          if (data['confirms'] == 1) {
            this.popupProvider.ionicAlert('confirmTitle', 'confirmTransaction').then((data) => {
            });
          }
        });
      } else {
        this.toast('text-password-error');
      }
    });
  }

}
