import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {IdKycResultComponent} from "../../../../pages/id/kyc/result/result";
import {ApiUrl} from "../../../../providers/ApiUrl";
import {IDManager} from "../../../../providers/IDManager";
import {TransferComponent} from "../../../../pages/coin/transfer/transfer.component";

@Component({
  selector: 'id-company',
  templateUrl: 'company.html',
})
export class IdKycCompanyComponent extends BaseComponent implements OnInit {
  businessObj={
              "type":"enterprise",
              "word":"北京比特大陆科技有限公司",
              "legalPerson":"詹克团",
              "registrationNum":"911101080804655794",
              "txHash":"59e5347c8cd6ee04c9241d48494bf0182751a071f7fab2ee960b17ab51ff3280",
              };
  priceObj:any={};
  payMoney:number = 0;
  unit:string ="ELA";
  serialNum:string;
  idObj:any;
  ngOnInit() {
    this.setTitleByAssets('text-certified-company');
    this.idObj = this.getNavParams();
    this.getPrice();
    //this.getAppAuth();
  }

  onCommit(): void {
    //this.sendCompanyHttp();
    if(this.checkParms()){
      this.businessObj["serialNum"] = this.serialNum;

      //this.Go(TransferComponent,{"did":this.idObj["id"],addr:"EV3N6EfLGeTnrf5d31LvLBP4hkE5tp9Z1L",money:this.payMoney,type:"kyc",chianId:"ELA",selectType:"company",parm:this.businessObj});
      this.Go(IdKycResultComponent,this.idObj);
    }
  }

  checkParms(): boolean{
     if(this.isNull(this.businessObj.word)){
         this.messageBox('text-word-message');
         return false;
     }

     if(this.isNull(this.businessObj.legalPerson)){
      this.messageBox('text-legalPerson-message');
      return false;
     }

     if(this.isNull(this.businessObj.registrationNum)){
      this.messageBox('text-registrationN-message');
      return false;
     }

     return true;
  }

  // sendCompanyHttp(){
  //     let timestamp = this.getTimestamp();
  //     this.businessObj["timestamp"] = timestamp;
  //     this.businessObj["serialNum"] = this.serialNum;
  //     let checksum = IDManager.getCheckSum(this.businessObj,"asc");
  //     this.businessObj["checksum"] = checksum;
  //     this.getHttp().postByAuth(ApiUrl.AUTH,this.businessObj).toPromise().then(data => {
  //          //this.Go(ResultComponent,{'status':'0'});
  //     }).catch(error => {
  //          //this.Go(ResultComponent,{'status':'1'});
  //     });
  // }

  getPrice(){
    let timestamp = this.getTimestamp();
    let parms ={"appid":"elastid","timestamp":timestamp};
    let checksum = IDManager.getCheckSum(parms,"asc");
    parms["checksum"] = checksum;
    this.getHttp().postByAuth(ApiUrl.GET_PRICE,parms).toPromise().then().then(data => {
        if(data["status"] === 200){
          console.log("sssss======="+JSON.stringify(data));
          this.priceObj = JSON.parse(data["_body"]);
          this.payMoney = this.priceObj["price"] || 0.1;
          this.unit = this.priceObj["unit"] || "ELA";
          this.serialNum = this.priceObj["serialNum"];
         }
    }).catch(error => {

    });
  }
}
