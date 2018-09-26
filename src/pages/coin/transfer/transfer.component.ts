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
import {ScancodePage} from '../../../pages/scancode/scancode';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html'})
export class TransferComponent extends BaseComponent implements OnInit {
  @ViewChild('subscribe') subPopup: PopupComponent;
  masterWalletId:string = "1";
  walletType = "";
  transfer: any = {
    toAddress: '',
    amount: '',
    memo: '',
    fee: 0,
    payPassword:'',//hptest
    remark:'',
  };

  balance = 0;

  chianId: string;

  feePerKb = 10000;

  rawTransaction: '';

  SELA = Config.SELA;
  appType:string="";
  selectType:string="";
  parms:any;
  txId:string;
  did:string;
  isInput = true;
  walletInfo = {};
  ngOnInit() {
    this.masterWalletId = Config.getCurMasterWalletId();
    this.setTitleByAssets('text-transfer');
    this.masterWalletId = Config.getCurMasterWalletId();
    let transferObj =this.getNavParams().data;
    console.log("=====pf==="+JSON.stringify(transferObj));
    this.chianId = transferObj["chianId"];
    this.transfer.toAddress = transferObj["addr"] || "";
    this.transfer.amount = transferObj["money"] || "";
    this.appType = transferObj["appType"] || "";
    if(this.appType==""){
        this.isInput = false;
    }else{
        this.isInput = true;
    }
    this.selectType = transferObj["selectType"] || "";
    this.parms = transferObj["parms"] || "";
    this.did = transferObj["did"] || "";
    this.walletInfo = transferObj["walletInfo"] || {};
    console.log("====walletInfo====="+JSON.stringify(this.walletInfo));
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
    this.walletManager.isAddressValid(this.masterWalletId,this.transfer.toAddress, (data) => {
      if (!data['success']) {
        this.toast("contact-address-digits");
        return;
      }

      console.log("====this.walletInfoType======"+this.walletInfo["Type"]);

      if(this.walletInfo["Type"] === "Standard"){
          this.createTransaction();
      }else if(this.walletInfo["Type"] === "Multi-Sign"){
        console.log("====this.walletInfoType======"+this.walletInfo["Type"]);
          this.createMultTx();
      }

      this.subPopup.show().subscribe((res: boolean) => {
      });
    })
  }

  createTransaction(){
    this.walletManager.createTransaction(this.masterWalletId,this.chianId, "",
      this.transfer.toAddress,
      this.transfer.amount*Config.SELA,
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

  getFee(){
    this.walletManager.calculateTransactionFee(this.masterWalletId,this.chianId,this.rawTransaction, this.feePerKb, (data) => {
      if(data['success']){
        console.log("=======calculateTransactionFee======"+JSON.stringify(data));
        this.transfer.fee = data['success'];
      }else{
        alert("====calculateTransactionFee====error"+JSON.stringify(data));
      }
    });
  }

  sendRawTransaction(){
    if (!Util.password(this.transfer.payPassword)) {
      this.toast("text-pwd-validator");
      return;
    }
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
        if(this.walletInfo["Type"] === "Standard"){
             this.sendTx(data["success"]);
        }else if(this.walletInfo["Type"] === "Multi-Sign"){
            this.Go(ScancodePage,{"txContent":{"chianId":this.chianId,"address":this.transfer.toAddress, "amount": this.transfer.amount,"fee":this.transfer.fee, "rawTransaction": data["success"]}});
        }
       }else{
         alert("=====signTransaction=error==="+JSON.stringify(data));
       }
    });
  }

  sendTx(rawTransaction){
    console.log("===publishTransaction====rawTransaction"+rawTransaction);
     this.walletManager.publishTransaction(this.masterWalletId,this.chianId,rawTransaction,(data)=>{
      if(data["success"]){
        console.log("===publishTransaction===="+JSON.stringify(data));
        this.txId = JSON.parse(data['success'])["TxHash"];
        console.log("=======sendRawTransaction======"+JSON.stringify(data));
        console.log("=======this.appType======"+JSON.stringify(data));
        if(this.isNull(this.appType)){
          console.log("===TabsComponent====");
          this.toast('send-raw-transaction');
          this.setRootRouter(TabsComponent);
        }else if(this.appType === "kyc"){
             if(this.selectType === "enterprise"){
                  this.company();
             }else {
                  this.person();
             }
        }
       }else{
         alert("=====signTransaction=error==="+JSON.stringify(data));
       }
     })
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
    params["deviceID"] = Config.getdeviceID();
    let checksum = IDManager.getCheckSum(params,"asc");
    params["checksum"] = checksum;

    console.info("ElastJs sendCompanyHttp params "+ JSON.stringify(params));
    this.getHttp().postByAuth(ApiUrl.AUTH,params).toPromise().then(data => {
         if(data["status"] === 200){
          let authData= JSON.parse(data["_body"]);
          console.info("Elastjs sendCompanyHttp authData" + JSON.stringify(authData));
          if(authData["errorCode"] === "0"){
               let serialNum = authData["serialNum"];
               let serIds = Config.getSerIds();
               serIds[serialNum] = {
                "id":this.did,
                "path":this.selectType,
                "serialNum":serialNum,
                "txHash":this.txId
               };
              Config.setSerIds(serIds);
              this.saveKycSerialNum(serialNum);
          }else{
              alert("sendCompanyHttp 错误码:"+authData["errorCode"]);
          }
         }

    }).catch(error => {
      alert("错误码:"+ JSON.stringify(error));
         this.Go(IdResultComponent,{'status':'1'});
    });
}

sendPersonAuth(parms){
      let timestamp = this.getTimestamp();
      parms["timestamp"] = timestamp;
      parms["txHash"] = this.txId;
      parms["deviceID"] = Config.getdeviceID();
      let checksum = IDManager.getCheckSum(parms,"asc");
      parms["checksum"] = checksum;
      console.log("---pesonParm---"+JSON.stringify(parms));
      console.info("ElastJs sendPersonAuth params "+ JSON.stringify(parms));

  this.getHttp().postByAuth(ApiUrl.AUTH,parms).toPromise().then(data=>{
        if(data["status"] === 200){
          let authData= JSON.parse(data["_body"])
          console.log('ElastJs sendPersonAuth return data ---authData---'+JSON.stringify(authData));
          if(authData["errorCode"] === "0"){

            console.log('ElastJs sendPersonAuth errorCode == 0');

            let serialNum = authData["serialNum"];
               let serIds = Config.getSerIds();
               serIds[serialNum] = {
                "id":this.did,
                "path":this.selectType,
                "serialNum":serialNum,
                "txHash":this.txId
               }
               console.log('ElastJs sendPersonAuth selectType '+ this.selectType +" serialNum " + serialNum);
               Config.setSerIds(serIds);
               this.saveKycSerialNum(serialNum);
          }else{
              alert("错误码:"+authData["errorCode"]);
          }
         }
      }).catch(error => {

      });
      this.Go(IdResultComponent,{'status':'0'});
}

saveKycSerialNum(serialNum){
  console.log('ElastJs saveKycSerialNum serialNum begin'+ serialNum);

  this.localStorage.get("kycId").then((val)=>{
         let idsObj = JSON.parse(val);
         let serialNumObj = idsObj[this.did][this.selectType][serialNum];
         serialNumObj["txHash"] = this.txId;
         serialNumObj["pathStatus"] = 1;
         this.localStorage.set("kycId",idsObj).then((newVal)=>{
          this.Go(IdResultComponent,{'status':'0',id:this.did,path:this.selectType});
         });
     })
}

createMultTx(){
  this.walletManager.createMultiSignTransaction(this.masterWalletId,this.chianId,"",
  this.transfer.toAddress,
  this.transfer.amount*Config.SELA,
  this.transfer.memo,
  (data)=>{
    if(data["success"]){
      console.log("====createMultiSignTransaction======"+JSON.stringify(data));
      this.rawTransaction = data['success'];
      this.getFee();
    }else{
      alert("====createMultiSignTransaction==error===="+JSON.stringify(data));
    }
  }
)
}

}
