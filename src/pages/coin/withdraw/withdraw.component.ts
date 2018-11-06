import {Component,ViewChild} from '@angular/core';
import {TabsComponent} from "../../tabs/tabs.component";
import {Util} from "../../../providers/Util";
import { Config } from '../../../providers/Config';
import { NavController, NavParams,ModalController,Events } from 'ionic-angular';
import {PaymentboxPage} from '../../../pages/paymentbox/paymentbox';
import {WalletManager} from '../../../providers/WalletManager';
import {Native} from "../../../providers/Native";
import {LocalStorage} from "../../../providers/Localstorage";
import {ScanPage} from '../../../pages/scan/scan';
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html'})
export class WithdrawComponent{

  masterWalletId:string = "1";
  transfer: any = {
    toAddress: '',
    amount: '',
    memo: '',
    fee: 20000,
    payPassword:'',
    remark:'',
  };

  mainchain: any = {
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
    this.events.subscribe("address:update",(address)=>{
      this.mainchain.accounts = address;
    });
    this.masterWalletId = Config.getCurMasterWalletId();
    let transferObj =this. navParams.data;
    this.chianId = transferObj["chianId"];
    this.initData();
  }

  rightHeader(){
    this.native.Go(this.navCtrl,ScanPage,{"pageType":"1"});
  }

  initData(){
    this.walletManager.getBalance(this.masterWalletId,this.chianId, (data)=>{
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
    if(Util.isNull(this.mainchain.accounts)){
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
    this.walletManager.isAddressValid(this.masterWalletId,this.mainchain.accounts, (data) => {
      if (!data['success']) {
        this.native.toast_trans("contact-address-digits");
        return;
      }
      this.native.showLoading().then(()=>{
        this.createWithdrawTransaction();
      })

    })
  }

  createWithdrawTransaction(){
    this.getDestroyAddress();
    let mainchainAddress = JSON.stringify([this.mainchain.accounts]);
    let mainchainAmounts = JSON.stringify([this.transfer.amount*Config.SELA - this.transfer.fee]);
    let mainchainIndex = JSON.stringify([this.mainchain.index]);
    this.walletManager.createWithdrawTransaction(this.masterWalletId,this.chianId, "",
      this.transfer.toAddress, // 销毁地址 34*0 ''
      this.transfer.amount*Config.SELA, // user input amount
      mainchainAddress, // user input address
      mainchainAmounts, // TODO default:0
      mainchainIndex, // TODO default:0
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

  getDestroyAddress(){
    // this.walletManager.getGenesisAddress(this.chianId, (data) => {
      this.transfer.toAddress = '1111111111111111111114oLvT2';
    // });
  }

  getFee(){
    this.walletManager.calculateTransactionFee(this.masterWalletId,this.chianId, this.rawTransaction, this.feePerKb, (data) => {
      if(data['success']){
        this.native.hideLoading();
        console.log("=======calculateTransactionFee======"+JSON.stringify(data));
        this.transfer.fee = data['success'];
        let transfer = this.native.clone(this.transfer);
        this.openPayModal(transfer);
      }else{
        alert("====calculateTransactionFee====error"+JSON.stringify(data));
      }
    });
  }

  // getRate(){
  //   this.sidechain.rate = 1;
  // }

  sendRawTransaction(){
    this.updateTxFee();
  }

  updateTxFee(){
    this.walletManager.updateTransactionFee(this.masterWalletId,this.chianId,this.rawTransaction, this.transfer.fee,(data)=>{
                       if(data["success"]){
                        console.log("===updateTransactionFee===="+JSON.stringify(data));
                        this.singTx(data["success"]);
                       }else{
                         alert("=====updateTransactionFee=error==="+JSON.stringify(data));
                       }
    });
  }

  singTx(rawTransaction){
    this.walletManager.signTransaction(this.masterWalletId,this.chianId,rawTransaction,this.transfer.payPassword,(data)=>{
      if(data["success"]){
        console.log("===signTransaction===="+JSON.stringify(data));
        this.sendTx(data["success"]);
       }else{
         alert("=====signTransaction=error==="+JSON.stringify(data));
       }
    });
  }

  sendTx(rawTransaction){
    this.walletManager.publishTransaction(this.masterWalletId,this.chianId,rawTransaction,(data)=>{
     if(data["success"]){
       this.native.hideLoading();
       console.log("======publishTransaction========"+JSON.stringify(data));
       this.native.setRootRouter(TabsComponent);
      }else{
        alert("========publishTransaction=====error==="+JSON.stringify(data));
      }

    })
 }

 openPayModal(data){
  let transfer = this.native.clone(data);
      transfer["accounts"] = this.mainchain.accounts;
  const modal = this.modalCtrl.create(PaymentboxPage,transfer);
  modal.onDidDismiss(data => {
    if(data){
      this.native.showLoading().then(()=>{
        this.transfer = data;
        this.sendRawTransaction();
      });
    }
  });
  modal.present();
}



}
