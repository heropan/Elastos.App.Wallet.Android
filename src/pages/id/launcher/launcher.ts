//<reference path="./../../../plugin/algorithmUtils.d.ts"/>


import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
//import {Config} from '../../../providers/Config';
//import {HomeComponent} from "../../../pages/id/home/home";
//import {CreateComponent} from "../../../pages/id/create/create";
//import {ImportComponent} from "../../../pages/id/import/import";
/**
 * Generated class for the LauncherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'id-launcher',
  templateUrl: 'launcher.html',
})
export class IdLauncherComponent extends BaseComponent implements OnInit{
  ngOnInit(){
      this.setTitleByAssets('text-id-name');
    // let kycObj = Config.getKycObj();
    // if(this.isEmptyObject(kycObj)){
    //     this.localstorage.get('kyc').then((val)=>{
    //     if(val === null){

    //     }else{
    //       Config.setKycObj(JSON.parse(val));
    //       this.Go(HomeComponent);
    //     }

    //   });
    //    return;
    // }
    // Config.setKycObj(JSON.parse(kycObj));
    // this.Go(HomeComponent);
  }

  onNext(type){
    switch (type){
      case 0:
        //this.Go(CreateComponent);
        break;
      case 1:
        //this.Go(ImportComponent);

        break;
    }
  }
}
