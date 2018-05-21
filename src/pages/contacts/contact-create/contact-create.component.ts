import { Component, OnInit } from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {ContactListComponent} from "../contact-list/contact-list.component";

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  // styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent  extends BaseComponent implements OnInit  {


  ngOnInit() {
    this.setTitleByAssets('text-contacts-add');
  }

  add(): void {
    this.Go(ContactListComponent)
  }

}
