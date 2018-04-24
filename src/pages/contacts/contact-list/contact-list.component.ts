import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';
import {RouterUtil} from '../../../providers/RouterUtil' ;

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less']
})
export class ContactListComponent  extends BaseComponent implements OnInit  {

  ngOnInit() {
  }

  onclick(): void {
    this.router.Go_v2({'path': '/contacts', 'id': 1});
  }

}
