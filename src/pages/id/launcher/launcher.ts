import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {IdImportComponent} from "../../../pages/id/import/import";
import {IdHomeComponent} from "../../../pages/id/home/home";
import { Config } from '../../../providers/Config';
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

            alert("luncher.ts ElastosJs  createDID registerIdListener  data  callback"+ JSON.stringify(data));
            console.info("luncher.ts ElastosJs createDID registerIdListener  data  callback !!!!!" + JSON.stringify(data));

            if(data["path"] == "Added"){

              if((data["Contents"].length > 0) && data["Contents"][0]["Proof"]){

                let proofObj = JSON.parse(data["Contents"][0]["Proof"]);
                let seqNumObj = self.dataManager.getSeqNumObj(proofObj["signature"]);
                let serialNum =  seqNumObj["serialNum"] ;
                console.info("home.ts ElastosJs createDID serialNum "+ serialNum);
                this.setOrderStatus(3,serialNum);
              }
            }


          });
          this.localStorage.add("kycId",idObj).then(()=>{
               this.Go(IdHomeComponent);
          });
    })
  }


  setOrderStatus(status,serialNum){
    let serids = Config.getSerIds();
    let serid = serids[serialNum];
    let did = serid["id"];
    let appName = serid["appName"];
    let appr = serid["appr"];
    let idsObj = {};
    this.localStorage.getKycList("kycId").then((val)=>{
        if(val == null || val === undefined || val === {} || val === ''){
             return;
        }
     idsObj = JSON.parse(val);
     idsObj[did][appName][appr]["order"][serialNum]["status"] = status;
     this.localStorage.set("kycId",idsObj).then(()=>{

     });
    });
  }
}
