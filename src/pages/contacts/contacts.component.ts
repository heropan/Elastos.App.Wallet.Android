import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../app/BaseComponent';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent  extends BaseComponent implements OnInit {


  ngOnInit() {
    this.setTitleByAssets('text-contacts-info');
    this.setRightIcon('../../assets/images/icon/icon-delete.svg', () => {
        this.rightHeader();
    });
    this.setHeadDisPlay({'right': true});
  }

  rightHeader(): void {
     alert('删除成功');
  }

  zhifu(): void {
    this.router.Go_v2({'path': '/coin/0/receive'});
  }

}
