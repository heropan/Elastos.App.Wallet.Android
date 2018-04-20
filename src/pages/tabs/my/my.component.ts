import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.less']
})
export class MyComponent  extends BaseComponent implements OnInit  {


  ngOnInit() {
  }

}
