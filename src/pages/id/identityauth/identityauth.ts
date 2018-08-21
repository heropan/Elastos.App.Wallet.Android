import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {IDManager} from "../../../providers/IDManager"
import {ApiUrl} from "../../../providers/ApiUrl"
import {TransferComponent} from "../../../pages/coin/transfer/transfer.component";
@Component({
  selector: 'page-identityauth',
  templateUrl: 'identityauth.html',
})
export class IdentityauthPage extends BaseComponent implements OnInit{
  personValidate = {fullName:'宋家准',identityNumber:'410426198811151012',"type":"identityCard"};//个人验证对象
  payMoney = 0;
  unit:string="ELA"
  priceObj:any={};
  parms:any;
  did:any;
  serialNum:string;
  path:string;
  ngOnInit(){
    this.setTitleByAssets('text-certified-person');
    this.parms = this.getNavParams().data;
    this.did = this.parms["id"];
    this.path = this.parms["path"] || "";
    this.getPrice();
  }

  onCommit(){
         if(this.checkIdentity()){
            this.saveKycSerialNum(this.serialNum);
         }
  }

  saveKycSerialNum(serialNum){
    this.localStorage.get("kycId").then((val)=>{
        let idsObj = JSON.parse(val);
        let order = idsObj[this.did][this.path];
        order[serialNum] = {serialNum:serialNum,pathStatus:0,payObj:{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.personValidate}};
        this.localStorage.set("kycId",idsObj).then((newVal)=>{
          this.Go(TransferComponent,{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.personValidate});
        });
    })
}

  checkIdentity(){
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

    return true;
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

}
