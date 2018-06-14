import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "./../../../app/BaseComponent";
import {Config} from '../../../providers/Config';
// import {CreateComponent} from "../../../pages/id/create/create";
// import {ImportComponent} from "../../../pages/id/import/import";
// import {ManagerComponent} from "../../../pages/id/manager/manager";
// import {PersonComponent} from "../../../pages/kyc/person/person";
// import {CompanyComponent} from "../../../pages/kyc/company/company";
/**
 * Generated class for the LauncherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'id-home',
  templateUrl: 'home.html',
})
export class IdHomeComponent extends BaseComponent implements OnInit{
  public kycIdArr:any=[];
  ngOnInit(){
    this.setTitleByAssets('text-id-home');
    this.setHeadDisPlay({'left': false});
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
        //this.Go(CreateComponent);
        break;
      case 1:
        //this.Go(ImportComponent);
        break;
      case 2:
        //this.Go(ManagerComponent);
        break;
    }
  }

  onItem(item){
    let id = item.id;
    if(item.createType === 1){
      //this.Go(PersonComponent,{'id':id});
    }else if(item.createType === 2){
      //this.Go(CompanyComponent,{'id':id});
    }
  }
}
