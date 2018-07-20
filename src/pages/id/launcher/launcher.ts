import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {IdImportComponent} from "../../../pages/id/import/import";
import {IdHomeComponent} from "../../../pages/id/home/home";

@Component({
  selector: 'id-launcher',
  templateUrl: 'launcher.html',
})
export class IdLauncherComponent extends BaseComponent implements OnInit{
  ngOnInit(){
      this.setTitleByAssets('text-id-my');
  }

  onNext(type){
    switch (type){
      case 0:
        this.createId();
        break;
      case 1:
        this.Go(IdImportComponent);
        break;
    }
  }

  createId(){
    this.walletManager.createDID("s12345678",(result)=>{
          let idObj ={id:result.didname};
          this.localStorage.add("kycId",idObj).then(()=>{
               this.Go(IdHomeComponent);
          });
    })
  }
}
