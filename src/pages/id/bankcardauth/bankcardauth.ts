import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {IDManager} from "../../../providers/IDManager"
import {ApiUrl} from "../../../providers/ApiUrl"
import {TransferComponent} from "../../../pages/coin/transfer/transfer.component";
import {Observable} from 'rxjs';
import 'rxjs/add/observable/timer';
@Component({
  selector: 'page-bankcardauth',
  templateUrl: 'bankcardauth.html',
})
export class BankcardauthPage extends BaseComponent implements OnInit{
  debitCard={fullName:'宋家准',identityNumber:'410426198811151012',cardNumber:'6225880167820399',cardMobile:'18210230496',cardCode:'',type:"bankCard"};
  payMoney = 0;
  unit:string="ELA";
  priceObj:any={};
  parms:any;
  did:any;
  serialNum:string;
  path:string;

  ngOnInit(){
    this.setTitleByAssets('text-card-debit');
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

    onCommit(){
      if(this.checkParms()){
        this.saveKycSerialNum(this.serialNum);
      }

   }

   saveKycSerialNum(serialNum){
     this.localStorage.get("kycId").then((val)=>{
         let idsObj = JSON.parse(val);
         let order = idsObj[this.did][this.path];
         order[serialNum] = {serialNum:serialNum,pathStatus:0,payObj:{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.debitCard}};
         this.localStorage.set("kycId",idsObj).then((newVal)=>{
           this.debitCard["serialNum"] = serialNum;

           this.Go(TransferComponent,{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.debitCard});
         });
     })
   }

   checkParms(){

    if(this.isNull(this.debitCard.fullName)){
      this.messageBox('text-realname-message');
       return;
}

if(this.isNull(this.debitCard.identityNumber)){
      this.messageBox('text-cardNo-message-1');
  return;
}

if(this.isCardNo(this.debitCard.identityNumber)){
  this.messageBox('text-cardNo-message-2');
  return;
}



    if(this.isNull(this.debitCard.cardNumber)){
      this.messageBox('text-debitCard-message-1');
       return;
     }

     if(this.isBankCard(this.debitCard.cardNumber)){
      this.messageBox('text-debitCard-message-2');
       return;
     }

    if(this.isNull(this.debitCard.cardMobile)){
          this.messageBox('text-phone-message-1');
           return;
    }

    if(this.checkCellphone(this.debitCard.cardMobile)){
      this.messageBox('text-phone-message-2');
      return;
    }

    if(this.isNull(this.debitCard.cardCode)){
          this.messageBox('text-sendcode-message-1');
      return;
     }

     return true;
   }
}
