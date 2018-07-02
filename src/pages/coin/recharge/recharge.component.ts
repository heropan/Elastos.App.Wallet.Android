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
  templateUrl: './recharge.component.html'})
export class RechargeComponent extends BaseComponent implements OnInit {

  @ViewChild('subscribe') subPopup: PopupComponent;


  transfer: any = {
    toAddress: '',
    amount: 0,
    memo: '',
    fee: 0,
    payPassword:'',
    remark:'',
  };

  sidechain: any = {
    accounts: '',
    amounts: 0,
    index: 0,
    rate: 1,
  };


  balance = 0;

  chianId: string;

  feePerKb = 10000;

  rawTransaction: '';

  SELA = Config.SELA;

  ngOnInit() {
    this.setTitleByAssets('text-recharge');
    let transferObj =this.getNavParams().data;
    this.chianId = transferObj["chianId"];
    this.initData();

    this.setRightIcon('./assets/images/icon/ico-scan.svg', () => {
      this.native.scan().then((q)=>{
        this.sidechain.accounts = q.text.split(":")[1];
      }).catch(err=>{
          this.toast('error-address');
      });
    });

    this.setHeadDisPlay({right: true});
    this.subPopup.config = {cancel:'',confirm:'',backdrop:false,is_full:false};
  }

  initData(){
    this.walletManager.getBalance('ELA', (data)=>{
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
    if(Util.isNull(this.sidechain.accounts)){
      this.toast('correct-address');
      return;
    }
    if (!Util.isAddressValid(this.sidechain.accounts)) {
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
    this.createDepositTransaction();
    this.subPopup.show().subscribe((res: boolean) => {
    });
  }


  createDepositTransaction(){
    this.getGenesisAddress();
    this.walletManager.createDepositTransaction('ELA', "",
      this.transfer.toAddress, // genesisAddress
      this.transfer.amount*Config.SELA, // user input amount
      this.sidechain.accounts, // user input address
      this.sidechain.amounts, // TODO default:0
      this.sidechain.index, // TODO default:0
      this.transfer.fee,
      this.transfer.memo,
      this.transfer.remark,
      (data)=>{
        alert(JSON.stringify(data));
        this.rawTransaction = data['transactionId'].toString();
        alert("createDepositTransaction: "+JSON.stringify(data))
        this.getFee();
      });
  }

  getGenesisAddress(){
    // this.walletManager.getGenesisAddress(this.chianId, (data) => {
      this.transfer.toAddress = 'XQd1DCi6H62NQdWZQhJCRnrPn7sF9CTjaU';
    // });
  }

  getFee(){
    this.walletManager.calculateTransactionFee(this.chianId, this.rawTransaction, this.feePerKb, (data) => {
      this.transfer.fee = data['fee'];
    });
  }

  // getRate(){
  //   this.sidechain.rate = 1;
  // }

  sendRawTransaction(){
    if (!Util.password(this.transfer.payPassword)) {
      this.toast("text-pwd-validator");
      return;
    }
    alert("sendRawTransaction: "+this.chianId)
    alert("sendRawTransaction: "+this.rawTransaction)
    alert("sendRawTransaction: "+this.transfer.fee)
    alert("sendRawTransaction: "+this.transfer.payPassword)
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
