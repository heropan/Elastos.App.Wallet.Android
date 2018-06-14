import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {Config} from '../../../providers/Config';
import {IdHomeComponent} from "../../../pages/id/home/home";
import {IdCreateComponent} from "../../../pages/id/create/create";
import {IdImportComponent} from "../../../pages/id/import/import";


@Component({
  selector: 'id-launcher',
  templateUrl: 'launcher.html',
})
export class IdLauncherComponent extends BaseComponent implements OnInit{
  ngOnInit(){
      this.setTitleByAssets('text-id-my');
      let kycObj = Config.getKycObj();
      if(this.isEmptyObject(kycObj)){
        this.localStorage.get('kyc').then((val)=>{
        if(val === null){

        }else{
          Config.setKycObj(JSON.parse(val));
          this.Go(IdHomeComponent);
        }
      });
       return;
    }
    Config.setKycObj(JSON.parse(kycObj));
    this.Go(IdHomeComponent);
  }

  onNext(type){
    switch (type){
      case 0:
        this.Go(IdCreateComponent);
        break;
      case 1:
        this.Go(IdImportComponent);
        break;
    }
  }
}
