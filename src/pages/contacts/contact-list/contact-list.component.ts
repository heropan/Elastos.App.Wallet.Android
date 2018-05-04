import { Component, OnInit } from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {RouterUtil} from './../../../providers/RouterUtil' ;

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
    this.router.Go_v2({'path': '/contactCreate'});
  }

  onclick(): void {
    this.router.Go_v2({'path': '/contacts', 'id': 1});
  }

}
