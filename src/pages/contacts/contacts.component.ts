import { Component, OnInit } from '@angular/core';
import {TransferComponent} from "../coin/transfer/transfer.component";
import { NavController, NavParams} from 'ionic-angular';
import {Native} from "../../providers/Native";
import {LocalStorage} from "../../providers/Localstorage";
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent{

  contactUser = {};
  qrcode: string = null;
  constructor(public navCtrl: NavController,public navParams: NavParams,public native: Native,public localStorage:LocalStorage) {
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
    this.localStorage.get('contactUsers').then((val)=>{
      let contactUsers = JSON.parse(val);
      delete(contactUsers[this.contactUser["id"]]);
      this.localStorage.set('contactUsers', contactUsers);
      this.navCtrl.pop();
      alert('删除成功');

    });
  }

  pay(id): void {
    this.native.Go(this.navCtrl,TransferComponent,{id:this.contactUser['address']});
  }
}
