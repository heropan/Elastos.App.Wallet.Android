import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.less']
})
export class ContactCreateComponent  extends BaseComponent implements OnInit  {


  ngOnInit() {
    this.setTitleByAssets('text-contacts-add');
  }

  add(): void {
    this.router.Go_v2({'path': '/contactsList'});
  }

}
