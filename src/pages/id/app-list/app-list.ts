import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "./../../../app/BaseComponent";
import {Config} from '../../../providers/Config';
import {kycSelectTypeComponent} from "../../../pages/id/kyc/selecttype/create";
@Component({
  selector: 'id-app-list',
  templateUrl: 'app-list.html',
})
export class IdAppListComponent extends BaseComponent implements OnInit{
  appList = Config.appList;
  id:string;
  ngOnInit(){
      this.setTitleByAssets('text-id-app-list-name');
      this.id =this.getNavParams().get("id");
  }

  onNext(item){
     let apptype = item.id;
     switch (apptype){
       case 0:
          this.selectType(this.id);
         break;
     }
  }

  selectType(item){
     let id = item;
     this.Go(kycSelectTypeComponent,{'id':id});
  }
}
