import { Component, OnInit } from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {ContactCreateComponent} from "../contact-create/contact-create.component";
import {ContactsComponent} from "../contacts.component";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  // styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent  extends BaseComponent implements OnInit  {


  ngOnInit() {
    this.setTitleByAssets('text-contacts');
    this.setRightIcon('./assets/images/icon/icon-add.svg', () => {
    this.rightHeader();
    });
    this.setHeadDisPlay({right: true});
  }

  rightHeader(): void {
    this.Go(ContactCreateComponent);
  }

  onclick(): void {
    this.Go(ContactsComponent,{id:1});
  }

}
