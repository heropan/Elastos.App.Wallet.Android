import {Component} from '@angular/core';
import {TabsComponent} from "../../tabs/tabs.component";
import {Util} from "../../../providers/Util";
import { Config } from '../../../providers/Config';
import { NavController, NavParams,ModalController,Events } from 'ionic-angular';
import {PaymentboxPage} from '../../../pages/paymentbox/paymentbox';
import {WalletManager} from '../../../providers/WalletManager';
import {Native} from "../../../providers/Native";
import {LocalStorage} from "../../../providers/Localstorage";
@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html'})
export class RechargeComponent{

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
  constructor(public navCtrl: NavController,public navParams: NavParams, public walletManager: WalletManager,
    public native: Native,public localStorage:LocalStorage,public modalCtrl: ModalController,public events :Events ){
         this.init();
    }
  init() {
    this.masterWalletId = Config.getCurMasterWalletId();
    let transferObj =this.navParams.data;
    this.chianId = transferObj["chianId"];
    this.getGenesisAddress();
    this.initData();
  }

  rightHeader(){
    this.native.scan().then((q)=>{
      let result = q.text;
      if (result.indexOf('elastos') != -1) {
        this.sidechain.accounts = result.split(":")[1];
      } else {
        this.sidechain.accounts = result.split(":")[0];
      }
    }).catch(err=>{
        this.native.toast_trans('error-address');
    });
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
    }
  }

  checkValue() {
    if(Util.isNull(this.sidechain.accounts)){
      this.native.toast_trans('correct-address');
      return;
    }
    if(Util.isNull(this.transfer.amount)){
      this.native.toast_trans('amount-null');
      return;
    }
    if(!Util.number(this.transfer.amount)){
      this.native.toast_trans('correct-amount');
      return;
    }
    if(this.transfer.amount > this.balance){
      this.native.toast_trans('error-amount');
      return;
    }
    this.walletManager.isAddressValid(this.masterWalletId,this.sidechain.accounts, (data) => {
      if (!data['success']) {
        this.native.toast_trans("contact-address-digits");
        return;
      }
      this.native.showLoading().then(()=>{
        this.createDepositTransaction();
      });

    })
  }


  createDepositTransaction(){
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
    this.walletManager.getGenesisAddress(this.masterWalletId, this.chianId, (data) => {
      this.transfer.toAddress = data['success'];
    });
  }

  getFee(){
    this.walletManager.calculateTransactionFee(this.masterWalletId,'ELA', this.rawTransaction, this.feePerKb, (data) => {
      if(data['success']){
        this.native.hideLoading();
        console.log("=======calculateTransactionFee======"+JSON.stringify(data));
        this.transfer.fee = data['success'];
        this.transfer.rate = this.sidechain.rate;
        this.openPayModal(this.transfer);
      }else{
        alert("====calculateTransactionFee====error"+JSON.stringify(data));
      }
    });
  }

  // getRate(){
  //   this.sidechain.rate = 1;
  // }

  sendRawTransaction(){
    // if (!Util.password(this.transfer.payPassword)) {
    //   this.native.toast_trans("text-pwd-validator");
    //   return;
    // }
    this.updateTxFee();
  }

  updateTxFee(){
    this.walletManager.updateTransactionFee(this.masterWalletId,'ELA',this.rawTransaction, this.transfer.fee,(data)=>{
                       if(data["success"]){
                        console.log("===updateTransactionFee===="+JSON.stringify(data));
                        this.singTx(data["success"]);
                       }else{
                         alert("=====updateTransactionFee=error==="+JSON.stringify(data));
                       }
    });
  }

  singTx(rawTransaction){
    this.walletManager.signTransaction(this.masterWalletId,'ELA',rawTransaction,this.transfer.payPassword,(data)=>{
      if(data["success"]){
        console.log("===signTransaction===="+JSON.stringify(data));
        this.sendTx(data["success"]);
       }else{
         alert("=====signTransaction=error==="+JSON.stringify(data));
       }
    });
  }

  sendTx(rawTransaction){
    this.walletManager.publishTransaction(this.masterWalletId,'ELA',rawTransaction,(data)=>{
     if(data["success"]){
       this.native.hideLoading();
         console.log("===publishTransaction===="+JSON.stringify(data));
         this.native.setRootRouter(TabsComponent);
      }else{
        alert("========publishTransaction=====error==="+JSON.stringify(data));
      }

    })
 }

 openPayModal(data){
  let transfer = this.native.clone(data);
      transfer["accounts"] = this.sidechain.accounts;
  const modal = this.modalCtrl.create(PaymentboxPage,transfer);
  modal.onDidDismiss(data => {
    if(data){
      this.native.showLoading().then(()=>{
        this.transfer = this.native.clone(data);
        this.sendRawTransaction();
      });
    }
  });
  modal.present();
}


}
