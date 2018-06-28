import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "./../../../app/BaseComponent";
import {Config} from '../../../providers/Config';
import {IdCreateComponent} from "../../../pages/id/create/create";
import {IdImportComponent} from "../../../pages/id/import/import";
import {IdManagerComponent} from "../../../pages/id/manager/manager";
import {IdAppListComponent} from "../../../pages/id/app-list/app-list";
import {TabsComponent} from "../../../pages/tabs/tabs.component";

@Component({
  selector: 'id-home',
  templateUrl: 'home.html',
})
export class IdHomeComponent extends BaseComponent implements OnInit{
  public kycIdArr:any=[];
  ngOnInit(){
    this.setTitleByAssets('text-id-home');
    this.setLeftIcon("",()=>{
       this.Go(TabsComponent);
    });
    let kycObj = Config.getKycObj();
    if(this.isEmptyObject(kycObj)){
         this.localStorage.get('kyc').then((val)=>{
        if(val === null){
          this.kycIdArr = [];
          Config.setKycObj(JSON.parse(val));
        }else{
           this.kycIdArr = this.objtoarr(JSON.parse(val));
           Config.setKycObj(JSON.parse(val));
        }
         });
          return;
      }
      this.kycIdArr = this.objtoarr(kycObj);
  }

  onNext(type){
    switch (type){
      case 0:
        this.Go(IdCreateComponent);
        break;
      case 1:
        this.Go(IdImportComponent);
        break;
      case 2:
        this.Go(IdManagerComponent);
        break;
    }
  }

  onItem(item){
    this.Go(IdAppListComponent,{"idObj":item});
  }
}
