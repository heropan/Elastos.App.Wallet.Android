import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
//import {SkinType, InputType} from 'ngx-weui';
//import {DialogService, DialogConfig, DialogComponent, ToastService, ToptipsComponent, ToptipsService } from 'ngx-weui';

import {ContactListComponent} from "../../contacts/contact-list/contact-list.component";
//import {Native} from "../../../providers/Native";
import {Util} from "../../../providers/Util";
import { PopupComponent } from "ngx-weui";



@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html'})
export class TransferComponent extends BaseComponent implements OnInit {

  @ViewChild('subscribe') subPopup: PopupComponent;


  transfer: any = {
    toAddress: '',
    amount: '',
    memo: '',
    fee: '',
    payPassword:'',
  };

  balance = 0;

  chianId: string;

  feeRate: 0.1;

  ngOnInit() {
    this.setTitleByAssets('text-transfer');

    this.chianId = this.getNavParams().get("chianId");

    this.setRightIcon('./assets/images/icon/ico-scan.svg', () => {
      this.native.scan().then((q)=>{
        this.transfer.toAddress = q.text.split(":")[1];
      }).catch(err=>{
          this.toast('error-address');
      });
    });

    this.setHeadDisPlay({right: true});

    //Logger.info(this.autoAS);
    this.subPopup.config = {cancel:'',confirm:'',backdrop:false,is_full:false};
  }

  initData(){
    this.walletManager.getBalance(this.chianId, (data)=>{
      this.balance = data.balance;
    });
  }


  onClick(type) {
    switch (type) {
      case 1:
        this.Go(ContactListComponent);
        break;
      case 2:   // 转账
        this.checkValue();
        break;
      case 3:
        this.subPopup.close();
        break;
      case 4:
        this.createTransaction();
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
    this.subPopup.show().subscribe((res: boolean) => {

    });
  }

  createTransaction(){
    // this.walletManager.sendTransaction(this.chianId, "",
    //   this.transfer.toAddress,
    //   this.transfer.amount,
    //   this.transfer.fee,
    //   this.transfer.payPassword,
    //   this.transfer.memo,
    //   ()=>{

    //   });
  }

  getFee(){
    // this.walletManager.buildTransaction(this.chianId, "",
    //   this.transfer.toAddress,
    //   this.transfer.amount,
    //   this.transfer.fee,
    //   this.transfer.payPassword,
    //   this.transfer.memo,
    //   (data)=>{
    //     this.transfer.fee = data.fee;
    //   });
  }



}
