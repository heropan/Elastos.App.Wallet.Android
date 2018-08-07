import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "./../../../app/BaseComponent";
import {IdImportComponent} from "../../../pages/id/import/import";
import {IdManagerComponent} from "../../../pages/id/manager/manager";
import {IdAppListComponent} from "../../../pages/id/app-list/app-list";
import {TabsComponent} from "../../../pages/tabs/tabs.component";
@Component({
  selector: 'id-home',
  templateUrl: 'home.html',
})
export class IdHomeComponent extends BaseComponent implements OnInit{
  public kycIdArr:any;
  ngOnInit(){
    this.setTitleByAssets('text-id-home');
    this.setLeftIcon("",()=>{
       this.Go(TabsComponent);
    });

    var self = this;
    this.localStorage.get("kycId").then((val)=>{

             let seqNumJsonObj = JSON.parse(val);
             this.kycIdArr = this.objtoarr(seqNumJsonObj);

             console.info("ElastosJs IdHomeComponent val" + val);
             self.initSeqObj(seqNumJsonObj);

             this.kycIdArr.forEach(function(e){
               console.info("ElastosJs IdHomeComponent e.id registerIdListener begin  " + e.id);
               self.walletManager.registerIdListener(e.id, (data) => {
                 alert("createDID registerIdListener  data  callback"+ JSON.stringify(data));
                 console.info("ElastosJs createDID registerIdListener  data  callback !!!!!" + JSON.stringify(data));

               });
               console.info("ElastosJs IdHomeComponent e.id  end registerIdListener" + e.id);
              });


    });

    this.events.subscribe('idhome:update', () => {
      this.localStorage.get("kycId").then((val)=>{
        this.kycIdArr = this.objtoarr(JSON.parse(val));
      });
    });
  }

  initSeqObj(allStoreSeqNumJsonObj){
    console.info("ElastosJs initSeqObj begin allStoreSeqNumJsonObj" + JSON.stringify(allStoreSeqNumJsonObj));
    var self = this;

    let ids = allStoreSeqNumJsonObj;
    for(let id in ids){
      let  idJsonObj = ids[id];
      if (! idJsonObj["kyc"]){
        continue;
      }

      for (let authType in idJsonObj["kyc"]){
        if (!idJsonObj["kyc"][authType]["order"]){
          continue
        }
        let order = idJsonObj["kyc"][authType]["order"];

        for (let prop in order) {

          if ( order[prop]["params"] && order[prop]["params"]["adata"])
          {
            var addataArry = [];
            addataArry = order[prop]["params"]["adata"];
            addataArry.forEach(function (value) {
              if (value && value["retdata"]) {
                if ( value["retdata"]["signature"]) {
                  let sign = value["retdata"]["signature"];
                  self.dataManager.addSeqNumObj(sign, order[prop] );
                 //console.info( "ElastosJs add sign " + sign + " obj "+ JSON.stringify(order[prop]));
                }
              }
            })
          }
        }
      }
    }
    console.info("ElastosJs initSeqObj end ");
  }

  onNext(type){
    switch (type){
      case 0:
        this.createDID();
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
    this.Go(IdAppListComponent,{"id":item.id});
  }

  createDID(){

    this.walletManager.createDID("s12345678",(result)=>{
      let idObj ={id:result.didname};
      alert("createDID before registerIdListener  ");
      this.walletManager.registerIdListener(result.didname, (data) => {
        console.info("ElastosJs home.ts createDID registerIdListener")+ JSON.stringify(data);
        ////////////////
        alert("home.ts createDID registerIdListener  data "+ JSON.stringify(data));

      });


      this.localStorage.add("kycId",idObj).then(()=>{
           this.kycIdArr.push({id:result.didname});
      });
    });
  }


  getDID(){
    this.walletManager.getDIDList((result)=>{
      this.kycIdArr = JSON.parse(result["list"]);
    });
  }
}
