import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/timer';
import {BaseComponent} from './../../app/BaseComponent';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})
export class TabsComponent extends BaseComponent implements OnInit {



  ngOnInit() {
    this.header.setHeaderDisplay(false);
    console.log(this.header.getHeaderDisplay());
  }





}
