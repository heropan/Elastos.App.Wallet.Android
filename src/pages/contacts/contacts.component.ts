import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../app/BaseComponent';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent  extends BaseComponent implements OnInit {


  ngOnInit() {
  }

}
