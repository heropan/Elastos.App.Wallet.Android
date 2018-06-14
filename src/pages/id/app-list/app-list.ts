import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "./../../../app/BaseComponent";
import {Config} from '../../../providers/Config';
import {IdKycPersonComponent} from "../../../pages/id/kyc/person/person";
import {IdKycCompanyComponent} from "../../../pages/id/kyc/company/company";

@Component({
  selector: 'id-app-list',
  templateUrl: 'app-list.html',
})
export class IdAppListComponent extends BaseComponent implements OnInit{
  appList = Config.appList;
  idObj={};
  ngOnInit(){
      this.setTitleByAssets('text-id-app-list-name');
      this.idObj =this.getNavParams().get("idObj");
  }

  onNext(item){
     let id = item.id;
     switch (id){
       case 0:
          this.kyc(this.idObj);
         break;
     }
  }

  kyc(item){
     let id = item.id;
    if(item.createType === 1){
      this.Go(IdKycPersonComponent,{'id':id});
    }else if(item.createType === 2){
      this.Go(IdKycCompanyComponent,{'id':id});
    }
  }
}
