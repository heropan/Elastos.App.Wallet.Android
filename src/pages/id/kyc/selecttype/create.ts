import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {IdKycPersonComponent} from "../../../../pages/id/kyc/person/person"
import {IdKycCompanyComponent} from "../../../../pages/id/kyc/company/company"


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
    this.createDID();
  }


  createDID(){
  if( this.createData.createType === 1){
    this.Go(IdKycPersonComponent,this.idObj);
  }else if(this.createData.createType === 2){
    this.Go(IdKycCompanyComponent,this.idObj);
  }
  }

}
