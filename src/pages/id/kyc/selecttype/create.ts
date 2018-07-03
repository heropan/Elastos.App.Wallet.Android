import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {IdKycPersonComponent} from "../../../../pages/id/kyc/person/person"
import {ApiUrl} from "../../../../providers/ApiUrl";
import {IdKycCompanyComponent} from "../../../../pages/id/kyc/company/company"
import {IDManager} from "../../../../providers/IDManager";
import {IdResultComponent} from "../../../../pages/id/result/result";
import {IdKycResultComponent} from "../../../../pages/id/kyc/result/result";
@Component({
  selector: 'kyc-select-type',
  templateUrl: 'create.html',
})
export class kycSelectTypeComponent extends BaseComponent implements OnInit{
  idObj:any;
  createData = {
    createType: 1,   //1 个人  2企业
  };
  idsObj:any;
  serialNum:string;
  txHash:string;
  vtoken:string;
  kyccontent:any;
  status:number;
  onChange(type){
    this.createData.createType = type;
  }

  ngOnInit(){
    this.idObj = this.getNavParams().data;
    this.setTitleByAssets('text-id-type');
    this.localStorage.get("kyc").then((val)=>{
            alert("======="+val);
            if(this.isNull(val)){
            this.idsObj = JSON.parse(val);
            this.serialNum = this.idsObj["serialNum"];
            this.vtoken = this.idsObj["vtoken"];
            this.txHash = this.idsObj["txHash"];
            this.status = this.idsObj["status"];
            this.getAppAuth();
           }
    });
  }

  onCommit(){
    this.createDID();
  }

  createDID(){
  if( this.createData.createType === 1){
    if(this.isNull(this.status)){
        this.Go(IdKycPersonComponent,this.idObj);
        return;
    }
    if(this.status == 0){
       this.Go(IdResultComponent,{'status':'0'});
         return;
    }
    if(this.status == 1){
      this.Go(IdKycResultComponent,{'status':'0',parms:this.idsObj});
      return;
    }

  }else if(this.createData.createType === 2){
    if(this.isNull(this.status)){
      this.Go(IdKycCompanyComponent,this.idObj);
      return
    }
    if(this.status == 0){
      this.Go(IdResultComponent,{'status':'0'});
      return;
    }
   if(this.status == 1){
      this.Go(IdKycResultComponent,{'status':'0',parms:this.idsObj});
     return;
   }
  }
  }

  getAppAuth(){
    let timestamp = this.getTimestamp();
    let parms ={"serialNum":this.serialNum,
                "txHash":this.txHash,
                "vtoken":this.vtoken,
                "timestamp":timestamp,
               }
    let checksum = IDManager.getCheckSum(parms,"asc");
    parms["checksum"] = checksum;
    this.getHttp().postByAuth(ApiUrl.APP_AUTH,parms).toPromise().then().then(data => {
      if(data["status"] === 200){
        console.log("sssss======="+JSON.stringify(data));
       let authResult = JSON.parse(data["_body"]);
       this.kyccontent = authResult["data"] || "";
       if(this.isNull(this.kyccontent)){

       }else{
        this.status = 1;
        this.idsObj["status"] = 1;
        alert("kkkkkkk====="+typeof(this.kyccontent));
        this.idsObj["signature"] = this.getsing(JSON.parse(this.kyccontent),"1");
       }
       this.localStorage.add("kyc",this.idsObj);
       }
    }).catch(error => {

    });
  }

  getsing(arr,type){
     for(var index in arr){
       let data = arr[index];
        if(type === data["type"]){
            return data["retdata"]["signature"];
        }
     }
  }
}
