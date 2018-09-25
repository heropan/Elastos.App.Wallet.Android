import { Component, OnInit } from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {ManagerComponent} from "../../wallet/manager/manager.component";
import {ContactListComponent} from "../../contacts/contact-list/contact-list.component";
import {IdLauncherComponent} from "../../id/launcher/launcher";
import {IdHomeComponent} from "../../id/home/home";
import {PublickeyPage} from '../../../pages/publickey/publickey';
import {TxdetailsPage} from '../../../pages/txdetails/txdetails';
@Component({
  selector: 'app-my',
  templateUrl: 'my.component.html',
})
export class MyComponent  extends BaseComponent implements OnInit  {


  ngOnInit() {
    this.setLeftIcon("",()=>{
      this.events.publish("home:update");
      this.Back();
    });
  }

  onNext(type): void {
     switch (type){
       case 0:
         this.Go(ManagerComponent);
         break;
       case 1:
         this.Go(PublickeyPage);
         break;
       case 2:
         this.Go(ContactListComponent);
         break;
       case 3:
         this.sendTX();
         break;
       case 4:
         this.singTx();
         break;
       case 6:
          this.getDIDList();
         break;
     }
   }

   getDIDList(){
    this.localStorage.get("kycId").then((val)=>{
      if(this.isNull(val)){
          this.Go(IdLauncherComponent);
          return;
      }
      this.Go(IdHomeComponent);
    });
   }

   singTx(){
    this.native.scan().then((data)=>{
      //this.getPassWord(data);
      let senddata = {"content":data["text"],type:4}
      this.Go(TxdetailsPage,senddata);
    }).catch((err)=>{

    });
    //this.Go(TxdetailsPage,{"txContent":{ "address": "XKUh4GLhFJiqAMTF6HyWQrV9pK9HcGUdfJ", "amount": "1", "memo": "", "fee": "0.0001", "rawTransaction": "" }});
   }

   sendTX(){
      this.native.scan().then((data)=>{
        let senddata = {"content":data["text"],type:3};
        this.Go(TxdetailsPage,{"txContent":senddata});
      }).catch((err)=>{

      });
   }


}
