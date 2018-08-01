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
    let self = this;
    this.walletManager.createDID("s12345678",(result)=>{

          let idObj ={id:result.didname};

          console.info("ElastosJs luncher.ts createDID result add registerIdListener" + JSON.stringify(result));
          self.walletManager.registerIdListener(result.didname, (data) => {

            alert("ElastosJs luncher.ts createDID registerIdListener  data  callback"+ JSON.stringify(data));
            console.info("ElastosJs createDID registerIdListener  data  callback !!!!!" + JSON.stringify(data));

          });
          this.localStorage.add("kycId",idObj).then(()=>{
               this.Go(IdHomeComponent);
          });
    })
  }
}
