import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {IdCreateComponent} from "../../../pages/id/create/create";
import {IdImportComponent} from "../../../pages/id/import/import";


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
        this.createDID();
        break;
      case 1:
        this.Go(IdImportComponent);
        break;
    }
  }

  createDID(){
    this.walletManager.createDID("s12345678",(result)=>{
                    this.tiaozhuan();
    });
  }
}
