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

    this.localStorage.get("kycId").then((val)=>{
             this.kycIdArr = this.objtoarr(JSON.parse(val));

             // this.kycIdArr.forEach(function(e){
             //
             //   alert("createDID registerIdListener e.id "+ e.id);
             //   //alert("createDID registerIdListener this.walletManager "+ this.walletManager)
             //   this.walletManager.registerIdListener(e.id, (data) => {
             //     ////////////////
             //     alert("createDID registerIdListener data "+ JSON.stringify(data));
             //
             //   });
             //   alert("createDID registerIdListener end e.id "+ e.id);
             //  });


    });

    this.events.subscribe('idhome:update', () => {
      this.localStorage.get("kycId").then((val)=>{
        this.kycIdArr = this.objtoarr(JSON.parse(val));
      });
    });
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
        ////////////////
        alert("createDID registerIdListener data "+ JSON.stringify(data));

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
