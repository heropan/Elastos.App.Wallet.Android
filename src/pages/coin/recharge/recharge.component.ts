import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {TabsComponent} from "../../tabs/tabs.component";
import {Util} from "../../../providers/Util";
import { PopupComponent } from "ngx-weui";
import { Config } from '../../../providers/Config';
@Component({
  selector: 'app-transfer',
  templateUrl: './recharge.component.html'})
export class RechargeComponent extends BaseComponent implements OnInit {

  @ViewChild('subscribe') subPopup: PopupComponent;
  masterWalletId:string ="1";

  transfer: any = {
    toAddress: '',
    amount: '',
    memo: '',
    fee: 20000,
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
        let result = q.text;
        if (result.indexOf('elastos') != -1) {
          this.sidechain.accounts = result.split(":")[1];
        } else {
          this.sidechain.accounts = result.split(":")[0];
        }
      }).catch(err=>{
          this.toast('error-address');
      });
    });

    this.setHeadDisPlay({right: true});
    this.subPopup.config = {cancel:'',confirm:'',backdrop:false,is_full:false};
  }

  initData(){
    this.walletManager.getBalance(this.masterWalletId,'ELA', (data)=>{
      if(!Util.isNull(data["success"])){
        console.log("===getBalance==="+JSON.stringify(data));
        this.balance = data["success"];
      }else{
       alert("===getBalance===error"+JSON.stringify(data));
      }
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
    if(Util.isNull(this.transfer.amount)){
      this.toast('amount-null');
      return;
    }
    if(!Util.number(this.transfer.amount)){
      this.toast('correct-amount');
      return;
    }
    if(this.transfer.amount > this.balance){
      this.toast('error-amount');
      return;
    }
    this.walletManager.isAddressValid(this.masterWalletId,this.sidechain.accounts, (data) => {
      if (!data['success']) {
        this.toast("contact-address-digits");
        return;
      }
      this.createDepositTransaction();
      this.subPopup.show().subscribe((res: boolean) => {
      });
    })
  }


  createDepositTransaction(){
    this.getGenesisAddress();
    let sidechainAddress = JSON.stringify([this.sidechain.accounts]);
    let sidechainAmounts = JSON.stringify([this.transfer.amount*Config.SELA - this.transfer.fee]);
    let sidechainIndex = JSON.stringify([this.sidechain.index]);
    this.walletManager.createDepositTransaction(this.masterWalletId,'ELA', "",
      this.transfer.toAddress, // genesisAddress
      this.transfer.amount*Config.SELA, // user input amount
      sidechainAddress, // user input address
      sidechainAmounts, // TODO default:0
      sidechainIndex, // TODO default:0
      this.transfer.memo,
      this.transfer.remark,
      (data)=>{
        if(data['success']){
          console.log("=======createTransaction======"+JSON.stringify(data));
          this.rawTransaction = data['success'];
          this.getFee();
        }else{
          alert("====createTransaction====error"+JSON.stringify(data));
        }
      });
  }

  getGenesisAddress(){
    // this.walletManager.getGenesisAddress(this.chianId, (data) => {
      this.transfer.toAddress = 'XKUh4GLhFJiqAMTF6HyWQrV9pK9HcGUdfJ';
    // });
  }

  getFee(){
    this.walletManager.calculateTransactionFee(this.masterWalletId,'ELA', this.rawTransaction, this.feePerKb, (data) => {
      if(data['success']){
        console.log("=======calculateTransactionFee======"+JSON.stringify(data));
        this.transfer.fee = data['success'];
      }else{
        alert("====calculateTransactionFee====error"+JSON.stringify(data));
      }
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
    this.walletManager.sendRawTransaction(this.masterWalletId,'ELA', this.rawTransaction, this.transfer.fee, this.transfer.payPassword, (data) => {
      if(data['success']){
        console.log("===sendRawTransaction===="+JSON.stringify(data));
        this.Go(TabsComponent);
      }else{
        alert("===sendRawTransaction==error=="+JSON.stringify(data));
      }
    });
  }

}
