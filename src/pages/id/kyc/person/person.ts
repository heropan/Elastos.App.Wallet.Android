import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {Observable} from 'rxjs';
import 'rxjs/add/observable/timer';
import {IdResultComponent} from "../../../../pages/id/result/result";
import {IDManager} from "../../../../providers/IDManager"
import {ApiUrl} from "../../../../providers/ApiUrl"
import {TransferComponent} from "../../../../pages/coin/transfer/transfer.component";

@Component({
  selector: 'id-person',
  templateUrl: 'person.html',
})
export class IdKycPersonComponent extends BaseComponent implements OnInit {
  validateObj ={"2":{isValidate:false,isSelect:true,payMoney:0.3},
                "3":{isValidate:false,isSelect:false,payMoney:0.1},
                "4":{isValidate:false,isSelect:false,payMoney:0.1}};
  personValidate = {fullName:'sss',identityNumber:'410426198811151012'};//个人验证对象
  phoneValidate  = {mobile:'18210230496',code:'123456'};//手机验证对象
  debitCard = {cardNumber:'6225260167820399',cardMobile:'18210230496',cardCode:'123456'};//银行卡验证对象
  payMoney = 0;
  unit:string="ELA"
  priceObj:any={};
  serialNum:string;
  ngOnInit() {
    this.setTitleByAssets('text-certified-person');
    this.getPrice();
    //this.sendCodeHttp();
    //this.calculateMenoy();
  }

  onSendCode(): Observable<boolean> {
    return Observable.timer(1000).map((v, i) => true);
  }

  onSendCode1(): Observable<boolean> {
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
  }
  calculateMenoy(){
    let pay = 0;
    for(let key in this.validateObj){
         if(!this.validateObj[key].isValidate && this.validateObj[key].isSelect){
              pay =pay+this.validateObj[key].payMoney;
         }
    }
    this.payMoney = pay;
  }

  getSelectType(){
    let type:string;
    for(let key in this.validateObj){
      if(!this.validateObj[key].isValidate && this.validateObj[key].isSelect){
             if(this.isNull(type)){
               type =key;
             }else{
               type =type+"/"+key;
             }
      }
     }
     return type;
  }

  getpayParms(){
    let obj  = {};
    for(let key in this.validateObj){
         let vobj = this.validateObj[key];
         //console.log("===key==="+key+typeof(key));
         if(key=="2"){
                obj["fullName"] = this.personValidate.fullName;
                obj["identityNumber"] = this.personValidate.identityNumber;
         }else if(!vobj.isValidate && vobj.isSelect&&key=="3"){
                obj["mobile"] = this.phoneValidate.mobile;
                obj["code"] = this.phoneValidate.code;
         }else if(!vobj.isValidate && vobj.isSelect&&key=="4"){
                obj["cardNumber"] = this.debitCard.cardNumber;
                obj["cardMobile"] = this.debitCard.cardMobile;
                obj["cardCode"] = this.debitCard.cardCode;
         }
    }
        return obj;
  }
  onCommit(): void {
    /**个人身份验证 */
     if(!this.validateObj['2'].isValidate && this.validateObj['2'].isSelect){
              if(this.isNull(this.personValidate.fullName)){
                    this.messageBox('text-realname-message');
                     return;
              }

              if(this.isNull(this.personValidate.identityNumber)){
                    this.messageBox('text-cardNo-message-1');
                return;
              }

              if(this.isCardNo(this.personValidate.identityNumber)){
                this.messageBox('text-cardNo-message-2');
                return;
              }
     }

     /**手机验证 */
     if(!this.validateObj['3'].isValidate && this.validateObj['3'].isSelect){
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
      }

      /**邮政卡验证 */
      if(!this.validateObj['4'].isValidate && this.validateObj['4'].isSelect){

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
        }
        let parms =this.getpayParms();
        let type = this.getSelectType();
        parms["type"] = type;
        parms["serialNum"] =this.serialNum;
        parms["txHash"] = "6a943e5079d424dd9daee8b3ef4062072ece5752ceea22612a0781b7a76d1dfe";
        this.Go(TransferComponent,{addr:"ENMLAuBi4qW7ViKwh6GbcaMcktU8j78T6F",money:this.payMoney,type:"kyc",chianId:"IdChain",selectType:"person",parms:parms});
    //this.sendPersonAuth();
  }


  sendCodeHttp(){
    let code = (Math.random()*1000000000000000).toString().substring(0,6);
    let timestamp = this.getTimestamp();
    let parms ={"mobile":"18210230496","code":code,"serialNum":this.serialNum,"timestamp":timestamp};
    let signature = IDManager.getInfoSign(parms);
    parms["signature"] = signature;
    let checksum = IDManager.getCheckSum(parms,"asc");
    parms["checksum"] = checksum;
    this.getHttp().postByAuth(ApiUrl.SEND_CODE,parms).toPromise().then(data=>{

    }).catch(error => {

    });
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

  sendPersonAuth(){
    let parms =this.getpayParms();
        let type = this.getSelectType();
        parms["type"] = type;
        let timestamp = this.getTimestamp();
        parms["timestamp"] = timestamp;
        parms["serialNum"] =this.serialNum;
        parms["txHash"] = "6a943e5079d424dd9daee8b3ef4062072ece5752ceea22612a0781b7a76d1dfe";
        let checksum = IDManager.getCheckSum(parms,"asc");
        parms["checksum"] = checksum;
        console.log("====parms===="+JSON.stringify(parms));
        this.getHttp().postByAuth(ApiUrl.AUTH,parms).toPromise().then(data=>{
          if(data["status"] === 200){
            this.Go(IdResultComponent,{'status':'0'});
           }
        }).catch(error => {

        });
        this.Go(IdResultComponent,{'status':'0'});
  }

}
