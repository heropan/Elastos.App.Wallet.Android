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
    createType: "person",   //1 个人  2企业
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

  getsing(arr,type){
     for(var index in arr){
       let data = arr[index];
        if(type === data["type"]){
            return data["retdata"]["signature"];
        }
     }
  }
}
