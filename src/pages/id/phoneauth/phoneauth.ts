import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {IDManager} from "../../../providers/IDManager"
import {ApiUrl} from "../../../providers/ApiUrl"
import {TransferComponent} from "../../../pages/coin/transfer/transfer.component";
import {Observable} from 'rxjs';
import 'rxjs/add/observable/timer';
@Component({
  selector: 'page-phoneauth',
  templateUrl: 'phoneauth.html',
})
export class PhoneauthPage extends BaseComponent implements OnInit{
  phoneValidate  = {fullName:'宋家准',identityNumber:'410426198811151012',mobile:'18210230496',code:'',type:"phone"};
  payMoney = 0;
  unit:string="ELA"
  priceObj:any={};
  parms:any;
  did:any;
  serialNum:string;
  path:string;
  ngOnInit(){
    this.setTitleByAssets('text-certified-phone');
    this.parms = this.getNavParams().data;
    this.did = this.parms["id"];
    this.path = this.parms["path"] || "";
    this.getPrice();
  }

  getPrice(){
    let timestamp = this.getTimestamp();
    let parms ={"appid":"elastid","timestamp":timestamp};
    let checksum = IDManager.getCheckSum(parms,"asc");
    parms["checksum"] = checksum;
    this.getHttp().postByAuth(ApiUrl.GET_PRICE,parms).toPromise().then().then(data => {
        if(data["status"] === 200){
          this.priceObj = JSON.parse(data["_body"]);
          this.payMoney = this.priceObj["price"] || 0.1;
          this.unit = this.priceObj["unit"] || "ELA";
          this.serialNum = this.priceObj["serialNum"];
         }
    }).catch(error => {

    });
  }

  onCommit(){
     this.saveKycSerialNum(this.serialNum);
  }

  saveKycSerialNum(serialNum){
    this.localStorage.get("kycId").then((val)=>{
        let idsObj = JSON.parse(val);
        let order = idsObj[this.did][this.path];
        order[serialNum] = {serialNum:serialNum,pathStatus:0,payObj:{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.phoneValidate}};
        this.localStorage.set("kycId",idsObj).then((newVal)=>{
          this.Go(TransferComponent,{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.phoneValidate});
        });
    })
}

  checkIdentity(){
    if(this.isNull(this.phoneValidate.fullName)){
      this.messageBox('text-realname-message');
       return;
     }

    if(this.isNull(this.phoneValidate.identityNumber)){
      this.messageBox('text-cardNo-message-1');
     return;
   }

   if(this.isCardNo(this.phoneValidate.identityNumber)){
      this.messageBox('text-cardNo-message-2');
       return;
    }

    if(this.isNull(this.phoneValidate.mobile)){
      this.messageBox('text-phone-message-1');
       return;
}

 if(this.checkCellphone(this.phoneValidate.mobile)){
  this.messageBox('text-phone-message-2');
  return;
  }

  if(this.isNull(this.phoneValidate.code)){
      this.messageBox('text-sendcode-message-1');
  return;
 }

    return true;
  }

  sendCodeHttp(mobile){
    let code = (Math.random()*1000000000000000).toString().substring(0,6);
    let timestamp = this.getTimestamp();
    let parms ={"mobile":mobile,"code":code,"serialNum":this.serialNum,"timestamp":timestamp};
    let checksum = IDManager.getCheckSum(parms,"asc");
    parms["checksum"] = checksum;
    this.getHttp().postByAuth(ApiUrl.SEND_CODE,parms).toPromise().then(data=>{

    }).catch(error => {

    });
  }

  public onSendCode(): Observable<boolean> {
    return Observable.timer(1000).map((v, i) => true);
  }

  sendCode(phone){
    if(this.isNull(phone)){
      this.messageBox('text-phone-message-1');
       return;
}

if(this.checkCellphone(phone)){
  this.messageBox('text-phone-message-2');
  return;
}
   this.sendCodeHttp(phone);
  }
}
