import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
//import {SkinType, InputType} from 'ngx-weui';
//import {DialogService, DialogConfig, DialogComponent, ToastService, ToptipsComponent, ToptipsService } from 'ngx-weui';

import {ContactListComponent} from "../../contacts/contact-list/contact-list.component";
//import {Native} from "../../../providers/Native";
import {ValidatorsUtil} from "../../../providers/ValidatorsUtil";
import { PopupComponent } from "ngx-weui";



@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html'})
export class TransferComponent extends BaseComponent implements OnInit {



  @ViewChild('subscribe') subPopup: PopupComponent;


  transfer: any = {
    toAdd: '',
    amount: '',
    remark: '',
    fees: '',
    payPassword:'',
  };

  balance = 1.0;

  ngOnInit() {
    this.setTitleByAssets('text-transfer');

    this.setRightIcon('./assets/images/icon/ico-scan.svg', () => {
      this.native.scan().then((q)=>{
        //this.transfer.toAdd(q.qrcode);
      }).catch(err=>{
          this.toast('error-address');
      });
    });

    this.setHeadDisPlay({right: true});

    //Logger.info(this.autoAS);
    this.subPopup.config = {cancel:'',confirm:'',backdrop:false,is_full:false};
  }

  initData(){
    // this.walletManager.getBalanceFun((data)=>{
    //   this.balance = data.balance;
    // });
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
    this.subPopup.show().subscribe((res: boolean) => {

    });

    if(ValidatorsUtil.isNull(this.transfer.address)){
      this.toast('correct-address');
      return;
    }
    if (!ValidatorsUtil.isAddressValid(this.transfer.address)) {
      this.messageBox("contact-address-digits");
      return;
    }
    if(ValidatorsUtil.number(this.transfer.amount)){
      this.toast('correct-amount');
      return;
    }

    if(this.transfer.amount > this.balance){
      this.toast('error-amount');
      return;
    }

  }

  createTransaction(){
    this.walletManager.sendTransaction(this.walletData.lastAddress
      ,this.transfer.toAdd,
      this.transfer.amount,
      this.transfer.fees,
      this.transfer.payPassword,
      this.transfer.remark,
      ()=>{

      });
  }

  getFee(){
    this.walletManager.getFee((data)=>{
      this.transfer.fees = data.fee;
    })
  }



}
