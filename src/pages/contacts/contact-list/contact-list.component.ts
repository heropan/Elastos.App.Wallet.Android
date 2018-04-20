import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less']
})
export class ContactListComponent  extends BaseComponent implements OnInit  {


  ngOnInit() {
  }

}
