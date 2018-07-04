import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {ContactListComponent} from "../../contacts/contact-list/contact-list.component";
import {TabsComponent} from "../../tabs/tabs.component";
import {Util} from "../../../providers/Util";
import { PopupComponent } from "ngx-weui";
import { Config } from '../../../providers/Config';
import {IDManager} from "../../../providers/IDManager";
import {ApiUrl} from "../../../providers/ApiUrl"
import {IdResultComponent} from "../../../pages/id/result/result";
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html'})
export class TransferComponent extends BaseComponent implements OnInit {

  @ViewChild('subscribe') subPopup: PopupComponent;


  transfer: any = {
    toAddress: '',
    amount: '',
    memo: '',
    fee: 0,
    payPassword:'',
    remark:'',
  };

  balance = 0;

  chianId: string;

  feePerKb = 10000;

  rawTransaction: '';

  SELA = Config.SELA;
  type:string="";
  selectType:string="";
  parms:any;
  txId:string;
  did:string;
  ngOnInit() {
    this.setTitleByAssets('text-transfer');
    let transferObj =this.getNavParams().data;
    this.chianId = transferObj["chianId"];
    this.transfer.toAddress = transferObj["addr"] || "";
    this.transfer.amount = transferObj["money"] || "";
    this.type = transferObj["type"] || "";
    this.selectType = transferObj["selectType"] || "";
    this.parms = transferObj["parms"] || "";
    this.did = transferObj["did"];
    this.initData();

    this.setRightIcon('./assets/images/icon/ico-scan.svg', () => {
      this.native.scan().then((q)=>{
        let result = q.text;
        if (result.indexOf('elastos') != -1) {
          this.transfer.toAddress = result.split(":")[1];
        } else {
          this.transfer.toAddress = result.split(":")[0];
        }
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
        this.sendRawTransaction();
        break;
    }

  }

  checkValue() {
    if(Util.isNull(this.transfer.toAddress)){
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
    this.walletManager.isAddressValid(this.transfer.toAddress, (data) => {
      if (!data['valid']) {
        this.toast("contact-address-digits");
        return;
      }
      this.createTransaction();
      this.subPopup.show().subscribe((res: boolean) => {
      });
    })
  }

  createTransaction(){
    this.walletManager.createTransaction(this.chianId, "",
      this.transfer.toAddress,
      this.transfer.amount*Config.SELA,
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
      this.txId = data["json"]["txHash"];
      if (data['ERRORCODE'] == undefined) {
        this.walletManager.registerWalletListener(this.chianId, (data) => {
          if (data['confirms'] == 1) {
            this.popupProvider.ionicAlert('confirmTitle', 'confirmTransaction').then((data) => {
            });
          }
        });
        if(this.isNull(this.type)){
          this.toast('send-raw-transaction');
          this.Go(TabsComponent);
        }else if(this.type === "kyc"){
             if(this.selectType === "company"){
                  this.company();
             }else if(this.selectType === "person"){
                  this.person();
             }
        }
      } else {
        this.toast('text-password-error');
      }
    });
  }

  company(){
    this.sendCompanyHttp(this.parms);
  }

  person(){
    this.sendPersonAuth(this.parms);
  }

  sendCompanyHttp(params){
    let timestamp = this.getTimestamp();
    params["timestamp"] = timestamp;
    params["txHash"] = this.txId;
    let checksum = IDManager.getCheckSum(params,"asc");
    params["checksum"] = checksum;
    this.getHttp().postByAuth(ApiUrl.AUTH,params).toPromise().then(data => {
         let authData= JSON.parse(data["_body"])
         this.localStorage.add("kyc",{id:this.did,status:0,'serialNum':authData['serialNum'],'vtoken':authData['vtoken'],'txHash':this.txId,'parms':this.parms}).then(()=>{
                    this.Go(IdResultComponent,{'status':'0'});
         });

    }).catch(error => {
         this.Go(IdResultComponent,{'status':'1'});
    });
}

sendPersonAuth(parms){
      let timestamp = this.getTimestamp();
      parms["timestamp"] = timestamp;
      parms["txHash"] = this.txId;
      let checksum = IDManager.getCheckSum(parms,"asc");
      parms["checksum"] = checksum;
      this.getHttp().postByAuth(ApiUrl.AUTH,parms).toPromise().then(data=>{
        if(data["status"] === 200){
          this.Go(IdResultComponent,{'status':'0'});
         }
      }).catch(error => {

      });
      this.Go(IdResultComponent,{'status':'0'});
}

}
