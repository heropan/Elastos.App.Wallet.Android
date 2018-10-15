import { Component} from '@angular/core';
import {TransferComponent} from "../coin/transfer/transfer.component";
import { NavController, NavParams,Events} from 'ionic-angular';
import {Native} from "../../providers/Native";
import {PopupProvider } from "../../providers/popup";
import {LocalStorage} from "../../providers/Localstorage";
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent{

  contactUser = {};
  qrcode: string = null;
  masterId:string ="1";
  constructor(public navCtrl: NavController,public navParams: NavParams,public native: Native,public localStorage:LocalStorage,public events:Events,public popupProvider:PopupProvider) {
    this.init();
}
  init() {
    this.localStorage.get('contactUsers').then((val)=>{
      if(val){
        let id = this.navParams.get("id");
        this.contactUser = JSON.parse(val)[id];
        this.qrcode = this.contactUser["address"].toString();
      }
    });
  }

  rightHeader(): void {
    this.popupProvider.ionicConfirm("confirmTitle","text-delete-contact-confirm").then((data)=>{
      if(data){
        this.localStorage.get('contactUsers').then((val)=>{
          let contactUsers = JSON.parse(val);
          delete(contactUsers[this.contactUser["id"]]);
          this.localStorage.set('contactUsers', contactUsers);
          this.events.publish("contanctList:update");
          this.navCtrl.pop();
        });
      }
    });
  }

  pay(): void {
    this.native.Go(this.navCtrl,TransferComponent,{addr:this.contactUser['address']});
  }
}
