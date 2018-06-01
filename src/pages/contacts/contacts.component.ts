import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../app/BaseComponent';
import {TransferComponent} from "../coin/transfer/transfer.component";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  // styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent  extends BaseComponent implements OnInit {

  contactUser = {};

  ngOnInit() {
    this.setTitleByAssets('text-contacts-info');
    this.setRightIcon('./assets/images/icon/icon-delete.svg', () => {
        this.rightHeader();
    });
    this.setHeadDisPlay({'right': true});
    this.localStorage.get('contactUsers').then((val)=>{
      let id = this.getNavParams().get("id");
      this.contactUser = JSON.parse(val)[id];
    });
  }

  rightHeader(): void {
     alert('删除成功');
  }

  pay(): void {
    this.Go(TransferComponent,{id:1});
  }
}
