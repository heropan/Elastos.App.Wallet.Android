import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {KycOperationPage} from "../../../../pages/id/kyc/kyc-operation/kyc-operation";
@Component({
  selector: 'kyc-select-type',
  templateUrl: 'create.html',
})
export class kycSelectTypeComponent extends BaseComponent implements OnInit{
  idObj:any;
  createData = {
    createType: 1,   //1 个人  2企业
  };
  onChange(type){
    this.createData.createType = type;
  }

  ngOnInit(){
    this.idObj = this.getNavParams().data;
    this.setTitleByAssets('text-id-type');
  }

  onCommit(){
    this.selectType();
  }

  selectType(){
  this.idObj["type"] = this.createData.createType;
  this.Go(KycOperationPage,this.idObj);
  }

  // getAppAuth(){
  //   let timestamp = this.getTimestamp();
  //   let parms ={"serialNum":this.serialNum,
  //               "txHash":this.txHash,
  //               "vtoken":this.vtoken,
  //               "timestamp":timestamp,
  //              }
  //   let checksum = IDManager.getCheckSum(parms,"asc");
  //   parms["checksum"] = checksum;
  //   this.getHttp().postByAuth(ApiUrl.APP_AUTH,parms).toPromise().then().then(data => {
  //     if(data["status"] === 200){
  //       console.log("sssss======="+JSON.stringify(data));
  //      let authResult = JSON.parse(data["_body"]);
  //      this.kyccontent = authResult["data"] || "";
  //      if(this.isNull(this.kyccontent)){

  //      }else{
  //       this.status = 1;
  //       this.idsObj["status"] = 1;
  //       alert("kkkkkkk====="+typeof(this.kyccontent));
  //       this.idsObj["signature"] = this.getsing(JSON.parse(this.kyccontent),"1");
  //      }
  //      this.localStorage.add("kyc",this.idsObj);
  //      }
  //   }).catch(error => {

  //   });
  //}

  getsing(arr,type){
     for(var index in arr){
       let data = arr[index];
        if(type === data["type"]){
            return data["retdata"]["signature"];
        }
     }
  }
}
