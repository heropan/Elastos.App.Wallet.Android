import { Component, OnInit } from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {ContactListComponent} from "../contact-list/contact-list.component";

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  // styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent  extends BaseComponent implements OnInit  {

  name: String;
  address: String;
  phone: String;
  email: String;
  remark: String;

  ngOnInit() {
    this.setTitleByAssets('text-contacts-add');
  }

  add(): void {
    let contactUsers = {
      id: this.name,
      name: this.name,
      address: this.address,
      phone: this.phone,
      email: this.email,
      remark: this.remark
    }
    this.storage.set('contactUsers', contactUsers).then((val)=>{
      this.Go(ContactListComponent);
    });
  }

}
